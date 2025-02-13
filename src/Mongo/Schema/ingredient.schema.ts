import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  @Prop({ type: String, required: true, minlength: 2 })
  name: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: false })
  unit?: string; // Unidade de medida (ex: gramas, xícaras, colheres)
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
