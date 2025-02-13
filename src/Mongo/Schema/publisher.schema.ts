import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Publisher {
  @Prop({ type: String, required: true, minlength: 2, maxlength: 100 })
  name: string;

  @Prop({ type: String, required: true, minlength: 2, maxlength: 100 })
  email: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
