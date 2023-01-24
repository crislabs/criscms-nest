import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataTeam } from './team.model';

@Schema({ versionKey: false })
export class TeamDocument extends AbstractDocument {
  @Prop({ type: DataTeam })
  data: DataTeam;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true })
  parentId: string;
  
}
export const FoodTeamSchema = SchemaFactory.createForClass(TeamDocument);
export const PetTeamSchema = SchemaFactory.createForClass(TeamDocument);
export const PortfolioTeamSchema = SchemaFactory.createForClass(TeamDocument);
export const HardwareStoreTeamSchema = SchemaFactory.createForClass(TeamDocument);
