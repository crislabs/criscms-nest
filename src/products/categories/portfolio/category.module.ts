import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioCommentModule } from 'src/comments/categories/portfolio/category.module';
import { PortfolioProduct } from 'src/common/entities/product.model';
import { PortfolioProductSchema } from 'src/common/entities/product.schema';
import { PortfolioProductResolver } from './category.resolver';
import { PortfolioProductService } from './category.service';

@Module({
  imports: [
    PortfolioCommentModule,
    MongooseModule.forFeature(
      [{ name: PortfolioProduct.name, schema: PortfolioProductSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioProductResolver, PortfolioProductService],
  exports: [PortfolioProductService],
})
export class PortfolioProductModule {}
