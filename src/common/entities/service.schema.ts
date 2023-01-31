import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract/abstract.schema';
import { DataService } from './service.model';

@Schema({ versionKey: false })
export class ServiceDocument extends AbstractDocument {
  @Prop({ type: DataService })
  data: DataService;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  parentId: string;
}
// export const HardwareStoreServiceSchema = SchemaFactory.createForClass(ServiceDocument);

export const PetServiceSchema = SchemaFactory.createForClass(ServiceDocument);
export const PortfolioServiceSchema = SchemaFactory.createForClass(ServiceDocument);
export const FoodServiceSchema = SchemaFactory.createForClass(ServiceDocument);
// export const PetServiceSchema = SchemaFactory.createForClass(ServiceDocument);
// export const FoodServiceSchema = SchemaFactory.createForClass(ServiceDocument);
