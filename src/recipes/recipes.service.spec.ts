import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { RecipeRepository } from '../Mongo/Repository/recipe.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Recipe } from 'src/Mongo/Interfaces/recipe.interface';
import { RecipeDTO } from './DTO/recipe.dto';
import { RecipeCategory } from './DTO/recipe-category.enum';

describe('RecipesService', () => {
  let recipesService: RecipesService;
  let recipeRepository: RecipeRepository;

  const mockRecipe: Recipe = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Pizza',
    publisher: { name: 'Chef John', email: 'chef.john@example.com' },
    category: RecipeCategory.GLUTEN_FREE,
    language: 'English',
    prepTime: 30,
    ingredients: [],
    instructions: ['Step 1', 'Step 2'],
  };

  const mockRecipeDTO: RecipeDTO = {
    name: 'Pizza',
    publisher: { name: 'Chef John', email: 'chef.john@example.com' },
    category: RecipeCategory.GLUTEN_FREE,
    language: 'English',
    prepTime: 30,
    ingredients: [],
    instructions: ['Step 1', 'Step 2'],
  };

  const mockRecipeRepository = {
    getAllRecipes: jest.fn(),
    findById: jest.fn(),
    saveRecipe: jest.fn(),
    deleteById: jest.fn(),
    updateById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: RecipeRepository,
          useValue: mockRecipeRepository,
        },
      ],
    }).compile();

    recipesService = module.get<RecipesService>(RecipesService);
    recipeRepository = module.get<RecipeRepository>(RecipeRepository);
  });

  describe('getAllRecipes', () => {
    it('should return an array of recipes', async () => {
      mockRecipeRepository.getAllRecipes.mockResolvedValue([mockRecipe]);

      const result = await recipesService.getAllRecipes();
      expect(result).toEqual([mockRecipe]);
    });

    it('should throw BadRequestException if no recipes found', async () => {
      mockRecipeRepository.getAllRecipes.mockResolvedValue([]);

      await expect(recipesService.getAllRecipes()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getRecipeById', () => {
    it('should return a recipe if found', async () => {
      mockRecipeRepository.findById.mockResolvedValue(mockRecipe);

      const result = await recipesService.getRecipeById(
        '67ab856bffe06c9d7bf5d872',
      );
      expect(result).toEqual(mockRecipe);
    });

    it('should throw NotFoundException if recipe does not exist', async () => {
      mockRecipeRepository.findById.mockResolvedValue(null);

      await expect(
        recipesService.getRecipeById(new mongoose.Types.ObjectId().toString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if recipe ID format is invalid', async () => {
      mockRecipeRepository.findById.mockRejectedValue({
        name: 'CastError', // Nome do erro que o MongoDB lançaria para ID inválido
      });

      await expect(recipesService.getRecipeById('invalid-id')).rejects.toThrow(
        BadRequestException,
      ); // Espera a exceção BadRequestException
    });
  });

  describe('saveRecipe', () => {
    it('should save and return a new recipe', async () => {
      mockRecipeRepository.saveRecipe.mockResolvedValue(mockRecipe);

      const result = await recipesService.saveRecipe(mockRecipeDTO);
      expect(result).toEqual(mockRecipe);
    });
  });

  describe('deleteRecipe', () => {
    it('should return the deleted recipe', async () => {
      mockRecipeRepository.deleteById.mockResolvedValue(mockRecipe);

      const result = await recipesService.deleteRecipe(
        '67ab856bffe06c9d7bf5d872',
      );
      expect(result).toEqual(mockRecipe);
    });

    it('should throw NotFoundException if recipe does not exist', async () => {
      mockRecipeRepository.deleteById.mockResolvedValue(null);

      await expect(
        recipesService.deleteRecipe(new mongoose.Types.ObjectId().toString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if recipe ID format is invalid', async () => {
      mockRecipeRepository.deleteById.mockRejectedValue({
        name: 'CastError', 
      });

      await expect(recipesService.deleteRecipe('invalid-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateRecipe', () => {
    it('should return the updated recipe', async () => {
      const updatedRecipe = { ...mockRecipe, name: 'Updated Pizza' };
      mockRecipeRepository.updateById = jest.fn().mockResolvedValue(updatedRecipe);
  
      const result = await recipesService.updateRecipe(
        '67ab856bffe06c9d7bf5d872',
        { name: 'Updated Pizza' },
      );
      expect(result).toEqual(updatedRecipe);
    });
  
    it('should throw NotFoundException if recipe does not exist', async () => {
      mockRecipeRepository.updateById = jest.fn().mockResolvedValue(null);
  
      await expect(
        recipesService.updateRecipe(
          new mongoose.Types.ObjectId().toString(),
          { name: 'Updated Pizza' },
        ),
      ).rejects.toThrow(NotFoundException);
    });
  
    it('should throw BadRequestException if recipe ID format is invalid', async () => {
      mockRecipeRepository.updateById = jest.fn().mockRejectedValue({
        name: 'CastError',
      });
  
      await expect(
        recipesService.updateRecipe('invalid-id', { name: 'Updated Pizza' }),
      ).rejects.toThrow(BadRequestException);
    });
  });
  
});
