import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import type { Recipe } from 'src/Mongo/Interfaces/recipe.interface';
import { RecipeDTO } from './DTO/recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Get()
  getAllRecipes(): Promise<Recipe[]> {
    return this.recipesService.getAllRecipes();
  }

  @Get('id/:recipeID')
  async getRecipeById(@Param('recipeID') recipeID: string) {
    return await this.recipesService.getRecipeById(recipeID);
  }

  @Post()
  @ApiBody({ type: RecipeDTO })
  async saveRecipe(@Body() newRecipe: RecipeDTO): Promise<Recipe> {
    return await this.recipesService.saveRecipe(newRecipe);
  }

  @Delete(':recipeID')
  async deleteRecipe(@Param('recipeID') recipeID: string) {
    return await this.recipesService.deleteRecipe(recipeID);
  }
}
