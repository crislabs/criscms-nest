import { Module } from '@nestjs/common';
import { PetTeamModule } from './categories/pet/category.module';
import { PortfolioTeamModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetTeamModule, PortfolioTeamModule],
})
export class TeamsModule {}
