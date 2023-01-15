import { Module } from '@nestjs/common';
import { PetAdoptionModule } from './categories/pet/category.module';


@Module({
  imports: [PetAdoptionModule],
})
export class AdoptionsModule {}
