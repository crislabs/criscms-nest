import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodCommentModule } from 'src/comments/categories/food/category.module';
import { FoodTeam } from 'src/common/entities/team.model';
import { FoodTeamSchema } from 'src/common/entities/team.schema';
import { FoodTeamResolver } from './category.resolver';
import { FoodTeamService } from './category.service';

@Module({
  imports: [
    FoodCommentModule,
    MongooseModule.forFeature(
      [{ name: FoodTeam.name, schema: FoodTeamSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodTeamResolver, FoodTeamService],
  exports: [FoodTeamService],
})
export class FoodTeamModule {}
