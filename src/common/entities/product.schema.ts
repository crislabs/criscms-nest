import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract/abstract.schema';
import { DataProduct } from './product.model';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({ type: DataProduct })
  data: DataProduct;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  parentId: string;
}
export const HardwareStoreProductSchema = SchemaFactory.createForClass(ProductDocument);

export const PetProductSchema = SchemaFactory.createForClass(ProductDocument);
export const PortfolioProductSchema = SchemaFactory.createForClass(ProductDocument);
export const PetAdoptionSchema = SchemaFactory.createForClass(ProductDocument);
export const FoodProductSchema = SchemaFactory.createForClass(ProductDocument);
