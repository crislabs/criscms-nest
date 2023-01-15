import { Module } from '@nestjs/common';
import { PetUserModule } from './categories/pet/category.module';

@Module({
  imports: [PetUserModule, ],
})
export class UsersModule {}
