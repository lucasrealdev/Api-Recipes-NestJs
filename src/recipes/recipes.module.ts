import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from 'src/Mongo/Schema/recipe.schema';
import { RecipesService } from './recipes.service';
import { RecipeRepository } from 'src/Mongo/Repository/recipe.repository';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  ],
  providers: [RecipesService, RecipeRepository],
  controllers: [RecipesController],
})
export class RecipesModule {}
