import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataUser } from './user.model';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: DataUser })
  data: DataUser;
  @Prop({ unique: true })
  email: string;

}
// export const UserSchema = SchemaFactory.createForClass(UserDocument);
export const FoodUserSchema = SchemaFactory.createForClass(UserDocument);
export const PetUserSchema = SchemaFactory.createForClass(UserDocument);
export const PortfolioUserSchema = SchemaFactory.createForClass(UserDocument);
export const HardwareStoreUserSchema = SchemaFactory.createForClass(UserDocument);