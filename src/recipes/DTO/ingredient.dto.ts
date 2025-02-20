import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class IngredientDTO {
  @ApiProperty({example: "Rice"})
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({example: 100})
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @ApiProperty({example: "gram"})
  @IsOptional()
  @IsString()
  readonly unit?: string; // Unidade de medida (ex: gramas, xícaras, colheres)
}
