import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioCommentModule } from 'src/comments/categories/portfolio/category.module';
import { PortfolioTeam } from 'src/common/entities/team.model';
import { PortfolioTeamSchema } from 'src/common/entities/team.schema';
import { PortfolioTeamResolver } from './category.resolver';
import { PortfolioTeamService } from './category.service';

@Module({
  imports: [
    PortfolioCommentModule,
    MongooseModule.forFeature(
      [{ name: PortfolioTeam.name, schema: PortfolioTeamSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioTeamResolver, PortfolioTeamService],
  exports: [PortfolioTeamService],
})
export class PortfolioTeamModule {}
