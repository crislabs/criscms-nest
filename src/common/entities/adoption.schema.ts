import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract/abstract.schema';
import { DataAdoption } from './adoption.model';

@Schema({ versionKey: false })
export class AdoptionDocument extends AbstractDocument {
  @Prop({ type: DataAdoption })
  dataAdoption: DataAdoption;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  parentId: string;
}
// export const HardwareStoreAdoptionSchema = SchemaFactory.createForClass(AdoptionDocument);

export const PetAdoptionSchema = SchemaFactory.createForClass(AdoptionDocument);
// export const PetAdoptionSchema = SchemaFactory.createForClass(AdoptionDocument);
// export const FoodAdoptionSchema = SchemaFactory.createForClass(AdoptionDocument);
