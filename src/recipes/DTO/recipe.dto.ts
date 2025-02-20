import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  IsArray,
  IsNumber,
  IsOptional,
  IsEnum,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IngredientDTO } from './ingredient.dto';
import { PublisherDTO } from './publisher.dto';
import { RecipeCategory } from './recipe-category.enum';

export class RecipeDTO {
  @ApiProperty({ example: 'Pizza' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @ApiProperty({ type: [PublisherDTO] })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PublisherDTO)
  readonly publisher: PublisherDTO;

  @ApiProperty({ enum: RecipeCategory, example: RecipeCategory.GLUTEN_FREE })
  @IsNotEmpty()
  @IsEnum(RecipeCategory)
  readonly category: RecipeCategory;

  @ApiProperty({ example: 'English' })
  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @IsNotEmpty()
  readonly prepTime: number;

  @ApiProperty({ type: [IngredientDTO] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDTO)
  readonly ingredients: IngredientDTO[];

  @ApiProperty({ example: ['Step 1', 'Step 2'], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'Instructions must contain at least one instruction.' })
  @IsString({ each: true })
  @MinLength(1, { each: true })
  readonly instructions: string[];

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly imageUrl?: string;

  @ApiProperty({ example: 'Extra tips for the recipe', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly notes?: string;
}
