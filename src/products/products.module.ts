import { Module } from '@nestjs/common';
import { PetProductModule } from './categories/pet/category.module';
import { PortfolioProductModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetProductModule, PortfolioProductModule],
})
export class ProductsModule {}
