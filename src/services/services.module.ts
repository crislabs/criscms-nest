import { Module } from '@nestjs/common';
import { FoodServiceModule } from './categories/food/category.module';
import { PetServiceModule } from './categories/pet/category.module';
import { PortfolioServiceModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetServiceModule, PortfolioServiceModule, FoodServiceModule],
})
export class ServicesModule {}
