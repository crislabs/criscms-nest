import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodCommentModule } from 'src/comments/categories/food/category.module';
import { FoodService } from 'src/common/entities/service.model';
import { FoodServiceSchema } from 'src/common/entities/service.schema';
import { FoodServiceResolver } from './category.resolver';
import { FoodServiceService } from './category.service';

@Module({
  imports: [
    FoodCommentModule,
    MongooseModule.forFeature(
      [{ name: FoodService.name, schema: FoodServiceSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodServiceResolver, FoodServiceService],
  exports: [FoodServiceService],
})
export class FoodServiceModule {}
