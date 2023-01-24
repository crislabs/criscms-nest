import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCommentModule } from 'src/comments/categories/pet/category.module';
import { PetTeam } from 'src/common/entities/team.model';
import { PetTeamSchema } from 'src/common/entities/team.schema';
import { PetTeamResolver } from './category.resolver';
import { PetTeamService } from './category.service';

@Module({
  imports: [
    PetCommentModule,
    MongooseModule.forFeature(
      [{ name: PetTeam.name, schema: PetTeamSchema }],
      'petDB',
    ),
  ],
  providers: [PetTeamResolver, PetTeamService],
  exports: [PetTeamService],
})
export class PetTeamModule {}
