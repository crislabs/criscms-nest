import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataArticle } from './article.model';

@Schema({ versionKey: false })
export class ArticleDocument extends AbstractDocument {
  @Prop({ type: DataArticle })
  data: DataArticle;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true })
  parentId: string;
  
}
export const FoodArticleSchema = SchemaFactory.createForClass(ArticleDocument);
export const PetArticleSchema = SchemaFactory.createForClass(ArticleDocument);
export const PortfolioArticleSchema = SchemaFactory.createForClass(ArticleDocument);
export const HardwareStoreArticleSchema = SchemaFactory.createForClass(ArticleDocument);
