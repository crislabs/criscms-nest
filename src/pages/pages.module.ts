import { Module } from '@nestjs/common';
import { FoodPageModule } from './categories/food/category.module';
import { PetPageModule } from './categories/pet/category.module';
import { PortfolioPageModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetPageModule, PortfolioPageModule, FoodPageModule],
})
export class PagesModule {}
