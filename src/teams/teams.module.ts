import { Module } from '@nestjs/common';
import { FoodTeamModule } from './categories/food/category.module';
import { PetTeamModule } from './categories/pet/category.module';
import { PortfolioTeamModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetTeamModule, PortfolioTeamModule, FoodTeamModule],
})
export class TeamsModule {}
