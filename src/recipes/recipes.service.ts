import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import type { Recipe } from 'src/Mongo/Interfaces/recipe.interface';
import { RecipeRepository } from '../Mongo/Repository/recipe.repository';
import { RecipeDTO } from './DTO/recipe.dto';

@Injectable() 
export class RecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async getAllRecipes(): Promise<Recipe[]> {
    const allRecipes = await this.recipeRepository.getAllRecipes();

    if (!allRecipes.length)
      throw new BadRequestException('There are no recipes registered yet');
    else return allRecipes;
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
    return await this.recipeRepository.saveRecipe(newRecipe);
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
