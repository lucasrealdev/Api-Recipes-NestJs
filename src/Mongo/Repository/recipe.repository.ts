import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Recipe } from '../Interfaces/recipe.interface';
import { RecipeDTO } from 'src/recipes/DTO/recipe.dto';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel('Recipe') private readonly RecipeModel: Model<Recipe>,
  ) {}

async getAllRecipes(filter: any, page: number, limit: number): Promise<Recipe[]> {
  return await this.RecipeModel.find(filter)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-__v')
    .exec();
}

async count(filter: any): Promise<number> {
  return await this.RecipeModel.countDocuments(filter).exec();
}

  async saveRecipe(newRecipe: RecipeDTO): Promise<Recipe> {
    console.log(newRecipe);
    const createdRecipe = new this.RecipeModel(newRecipe, { __v: false });
    return createdRecipe.save();
  }

  async findById(RecipeID: string): Promise<Recipe | null> {
    return await this.RecipeModel.findById(RecipeID).select('-__v').exec();
  }

  async deleteById(recipeID: string): Promise<Recipe | null> {
    return await this.RecipeModel.findByIdAndDelete(recipeID).select('-__v').exec();
  }

  async updateById(recipeID: string, updateData: Partial<RecipeDTO>): Promise<Recipe | null> {
    try {
      const updatedRecipe = await this.RecipeModel.findByIdAndUpdate(
        recipeID,
        updateData,
        { new: true, runValidators: true }
      ).select('-__v');
  
      return updatedRecipe;
    } catch (error) {
      return null;
    }
  }  
}
