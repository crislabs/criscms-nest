import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioCommentModule } from 'src/comments/categories/portfolio/category.module';
import { PortfolioService } from 'src/common/entities/service.model';
import { PortfolioServiceSchema } from 'src/common/entities/service.schema';
import { PortfolioServiceResolver } from './category.resolver';
import { PortfolioServiceService } from './category.service';

@Module({
  imports: [
    PortfolioCommentModule,
    MongooseModule.forFeature(
      [{ name: PortfolioService.name, schema: PortfolioServiceSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioServiceResolver, PortfolioServiceService],
  exports: [PortfolioServiceService],
})
export class PortfolioServiceModule {}
