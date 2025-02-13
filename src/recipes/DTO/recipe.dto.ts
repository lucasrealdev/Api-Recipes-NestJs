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
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PublisherDTO)
  readonly publisher: PublisherDTO;

  @IsNotEmpty()
  @IsEnum(RecipeCategory)
  readonly category: RecipeCategory;

  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @IsNumber()
  @IsNotEmpty()
  readonly prepTime: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDTO)
  readonly ingredients: IngredientDTO[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, {
    message: 'Instructions must contain at least one instruction.',
  })
  @IsString({ each: true })
  @MinLength(1, { each: true })
  readonly instructions: string[];

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly imageUrl?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly notes?: string; // Notas adicionais (por exemplo, dicas ou substituições de ingredientes)
}
