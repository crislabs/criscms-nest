import { Module } from '@nestjs/common';
import { FoodUserModule } from './categories/food/category.module';
import { PetUserModule } from './categories/pet/category.module';
import { PortfolioUserModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetUserModule, PortfolioUserModule, FoodUserModule],
})
export class UsersModule {}
