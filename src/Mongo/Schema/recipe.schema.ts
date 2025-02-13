import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RecipeCategory } from 'src/recipes/DTO/recipe-category.enum';
import { Publisher } from './publisher.schema';
import { Ingredient } from './ingredient.schema';

@Schema()
export class Recipe {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Publisher, required: true })
  publisher: Publisher;

  @Prop({ type: String, enum: RecipeCategory, required: true })
  category: RecipeCategory;

  @Prop({ type: String, required: true })
  language: string;

  @Prop({ type: Number, required: true })
  prepTime: number;

  @Prop({ type: [Ingredient], required: true })
  ingredients: Ingredient[];

  @Prop({ type: [String], required: true })
  instructions: string[];

  @Prop({ type: String, required: false })
  imageUrl?: string;

  @Prop({ type: String, required: false })
  notes?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
