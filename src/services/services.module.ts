import { Module } from '@nestjs/common';
import { PetServiceModule } from './categories/pet/category.module';


@Module({
  imports: [PetServiceModule],
})
export class ServicesModule {}
