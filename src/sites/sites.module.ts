import { Module } from '@nestjs/common';
import { PetSiteModule } from './categories/pet/category.module';

@Module({
  imports: [PetSiteModule],
})
export class SitesModule {}
