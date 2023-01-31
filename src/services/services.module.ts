import { Module } from '@nestjs/common';
import { PetServiceModule } from './categories/pet/category.module';
import { PortfolioServiceModule } from './categories/portfolio/category.module';


@Module({
  imports: [PetServiceModule, PortfolioServiceModule],
})
export class ServicesModule {}
