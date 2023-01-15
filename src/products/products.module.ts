import { Module } from '@nestjs/common';
import { PetProductModule } from './categories/pet/category.module';


@Module({
  imports: [PetProductModule],
})
export class ProductsModule {}
