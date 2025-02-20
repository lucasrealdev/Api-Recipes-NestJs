import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import type { Recipe } from 'src/Mongo/Interfaces/recipe.interface';
import { RecipeDTO } from './DTO/recipe.dto';
import type { PaginatedRecipes } from 'src/Mongo/Interfaces/paginatedRecipes.interface';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'minPrepTime', required: false })
  @ApiQuery({ name: 'maxPrepTime', required: false })
  @ApiQuery({ name: 'ingredients', required: false, isArray: true })
  async getAllRecipes(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('minPrepTime') minPrepTime?: number,
    @Query('maxPrepTime') maxPrepTime?: number,
    @Query('ingredients') ingredients?: string[],
  ): Promise<PaginatedRecipes> {
    return await this.recipesService.getAllRecipes(
      Number(page) || 1,
      Number(limit) || 10,
      name,
      minPrepTime ? Number(minPrepTime) : undefined,
      maxPrepTime ? Number(maxPrepTime) : undefined,
      ingredients,
    );
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
  async deleteRecipe(@Param('recipeID') recipeID: string): Promise<Recipe> {
    return await this.recipesService.deleteRecipe(recipeID);
  }

  @Patch(':recipeID')
  async updateRecipe(
    @Param('recipeID') recipeID: string,
    @Body() updateData: Partial<RecipeDTO>,
  ): Promise<Recipe> {
    return await this.recipesService.updateRecipe(recipeID, updateData);
  }
}
