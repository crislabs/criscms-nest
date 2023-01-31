import { Module } from '@nestjs/common';
import { FoodSiteModule } from './categories/food/category.module';
import { PetSiteModule } from './categories/pet/category.module';
import { PortfolioSiteModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetSiteModule, PortfolioSiteModule, FoodSiteModule],
})
export class SitesModule {}
