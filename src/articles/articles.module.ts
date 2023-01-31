import { Module } from '@nestjs/common';
import { FoodArticleModule } from './categories/food/category.module';
import { PetArticleModule } from './categories/pet/category.module';
import { PortfolioArticleModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetArticleModule, PortfolioArticleModule, FoodArticleModule],
})
export class ArticlesModule {}
