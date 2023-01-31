import { Module } from '@nestjs/common';
import { FoodProductModule } from './categories/food/category.module';
import { PetProductModule } from './categories/pet/category.module';
import { PortfolioProductModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetProductModule, PortfolioProductModule, FoodProductModule],
})
export class ProductsModule {}
