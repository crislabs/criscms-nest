import { Module } from '@nestjs/common';
import { PetCommentModule } from './categories/pet/category.module';

@Module({
  imports: [PetCommentModule, ],
})
export class CommentsModule {}
