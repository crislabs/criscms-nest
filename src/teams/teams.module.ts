import { Module } from '@nestjs/common';
import { PetTeamModule } from './categories/pet/category.module';


@Module({
  imports: [PetTeamModule],
})
export class TeamsModule {}
