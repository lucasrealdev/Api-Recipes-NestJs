import { Recipe } from 'src/Mongo/Interfaces/recipe.interface';

export interface PaginatedRecipes {
  recipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
  currentPage: number;
}
