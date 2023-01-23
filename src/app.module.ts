import { Module } from '@nestjs/common';
import { AdoptionsModule } from './adoptions/adoptions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/config/common.module';
import { PagesModule } from './pages/pages.module';
import { ProductsModule } from './products/products.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';
import { UploadsModule } from './uploads/uploads.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [CommonModule, SitesModule, PagesModule, AdoptionsModule, ProductsModule, UsersModule, ArticlesModule, CommentsModule, UploadsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
