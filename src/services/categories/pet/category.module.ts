import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCommentModule } from 'src/comments/categories/pet/category.module';
import { PetService } from 'src/common/entities/service.model';
import { PetServiceSchema } from 'src/common/entities/service.schema';
import { PetServiceResolver } from './category.resolver';
import { PetServiceService } from './category.service';

@Module({
  imports: [
    PetCommentModule,
    MongooseModule.forFeature(
      [{ name: PetService.name, schema: PetServiceSchema }],
      'petDB',
    ),
  ],
  providers: [PetServiceResolver, PetServiceService],
  exports: [PetServiceService],
})
export class PetServiceModule {}
