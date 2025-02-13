import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class IngredientDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @IsOptional()
  @IsString()
  readonly unit?: string; // Unidade de medida (ex: gramas, xícaras, colheres)
}
