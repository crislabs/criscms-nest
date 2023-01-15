import { Module } from '@nestjs/common';
import { PetPageModule } from './categories/pet/category.module';

@Module({
  imports: [PetPageModule],
})
export class PagesModule {}
