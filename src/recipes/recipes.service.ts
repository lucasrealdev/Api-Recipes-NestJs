import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import type { Recipe } from 'src/Mongo/Interfaces/recipe.interface';
import { RecipeRepository } from '../Mongo/Repository/recipe.repository';
import { RecipeDTO } from './DTO/recipe.dto';
import type { PaginatedRecipes } from 'src/Mongo/Interfaces/paginatedRecipes.interface';
import type { IngredientDTO } from './DTO/ingredient.dto';

type RecipeDocument = Omit<RecipeDTO, 'ingredients'> & {
  normalizedName: string;
  ingredients: (IngredientDTO & { normalizedName: string })[];
};


@Injectable()
export class RecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) { }

  async getAllRecipes(
    page: number,
    limit: number,
    name?: string,
    minPrepTime?: number,
    maxPrepTime?: number,
    ingredients?: string[],
  ): Promise<PaginatedRecipes> {
    const filter: any = {};
  
    if (name) {
      const normalizedSearchName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      filter.normalizedName = { $regex: normalizedSearchName, $options: 'i' };
    }
  
    if (minPrepTime) filter.prepTime = { $gte: minPrepTime };
    if (maxPrepTime) filter.prepTime = { ...filter.prepTime, $lte: maxPrepTime };
  
    if (ingredients) {
      const ingredientsArray = Array.isArray(ingredients) ? ingredients : [ingredients];
      const normalizedIngredients = ingredientsArray.map(ing => ing.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  
      filter['ingredients.normalizedName'] = {
        $all: normalizedIngredients.map(ing => new RegExp(ing, 'i')),
      };
    }
  
    const totalRecipes = await this.recipeRepository.count(filter);
    const totalPages = Math.ceil(totalRecipes / limit);
    const recipes = await this.recipeRepository.getAllRecipes(filter, page, limit);
  
    return {
      recipes,
      totalPages,
      totalRecipes,
      currentPage: page,
    };
  }  

  async getRecipeById(recipeID: string): Promise<Recipe> {
    try {
      const recipe = await this.recipeRepository.findById(recipeID);
      if (!recipe) {
        throw new NotFoundException('This recipe does not exist');
      }
      return recipe;
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequestException('Invalid recipe ID format');
      }
      throw new NotFoundException('This recipe does not exist');
    }
  }

  async saveRecipe(newRecipe: RecipeDTO): Promise<Recipe> {
    const normalizedName = newRecipe.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    const normalizedIngredients = newRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      normalizedName: ingredient.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    }));
  
    const recipeData: RecipeDocument = {
      ...newRecipe,
      normalizedName,
      ingredients: normalizedIngredients,
    };
  
    return await this.recipeRepository.saveRecipe(recipeData);
  }  

  async deleteRecipe(recipeID: string): Promise<Recipe> {
    try {
      const deletedRecipe = await this.recipeRepository.deleteById(recipeID);
      if (!deletedRecipe) {
        throw new NotFoundException('This recipe does not exist');
      }
      return deletedRecipe;
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequestException('Invalid recipe ID format');
      }
      throw new NotFoundException('This recipe does not exist');
    }
  }

  async updateRecipe(recipeID: string, updateData: Partial<RecipeDTO>): Promise<Recipe> {
    try {
      const updatedRecipe = await this.recipeRepository.updateById(recipeID, updateData);
      if (!updatedRecipe) {
        throw new NotFoundException('Recipe not found');
      }
      return updatedRecipe;
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequestException('Invalid recipe ID format');
      }
      throw new NotFoundException('Recipe not found');
    }
  }

}
