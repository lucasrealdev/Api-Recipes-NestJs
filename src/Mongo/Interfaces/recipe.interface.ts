import * as mongoose from 'mongoose';
import { IngredientDTO } from 'src/recipes/DTO/ingredient.dto';
import { PublisherDTO } from 'src/recipes/DTO/publisher.dto';
import { RecipeCategory } from 'src/recipes/DTO/recipe-category.enum';

export interface Recipe {
  readonly _id: mongoose.Types.ObjectId;
  readonly name: string;
  readonly publisher: PublisherDTO;
  readonly category: RecipeCategory;
  readonly language: string;
  readonly prepTime: number;
  readonly ingredients: IngredientDTO[];
  readonly instructions: string[];
  readonly imageUrl?: string;
  readonly notes?: string;
}
