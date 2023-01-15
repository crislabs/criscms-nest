import { Module } from '@nestjs/common';
import { PetArticleModule } from './categories/pet/category.module';

@Module({
  imports: [PetArticleModule, ],
})
export class ArticlesModule {}
