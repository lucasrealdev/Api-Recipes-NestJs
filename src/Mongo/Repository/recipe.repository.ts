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

  async getAllRecipes(): Promise<Recipe[]> {
    return await this.RecipeModel.find().sort({ name: +1 }).select('-__v').exec();
  }

  async saveRecipe(newRecipe: RecipeDTO): Promise<Recipe> {
    const createdRecipe = new this.RecipeModel(newRecipe, { __v: false });
    return createdRecipe.save();
  }

  async findById(RecipeID: string): Promise<Recipe | null> {
    return await this.RecipeModel.findById(RecipeID).select('-__v').exec();
  }

  async deleteById(recipeID: string): Promise<Recipe | null> {
    return await this.RecipeModel.findByIdAndDelete(recipeID).select('-__v').exec();
  }
}
