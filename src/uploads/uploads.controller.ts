import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SingleFileDto } from 'src/common/dto/single-file-dto';
import { FastifyFileInterceptor } from 'utils/fastify-file-interceptor';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}
  @Post('file')
  @UseInterceptors(FastifyFileInterceptor('photo_url', {}))
  async uploadFileAndPassValidation(
    @Body() body: SingleFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'svg|png|jpg|jpeg|webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const url = await this.uploadService.uploadFile(
      file,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }

  @Post('file-url')
  async uploadFileByUrl(@Body() body: SingleFileDto) {
    const url = await this.uploadService.uploadFileUrl(
      body.photo_url,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }

  @Post('delete')
  async deleteImage(@Body() body: { name: string; type: string }) {
    return await this.uploadService.deleteFile(body.name, body.type);
  }

  @Post('deletes')
  async deleteImages(@Body() body: { parentId: string; type: string }) {
    return await this.uploadService.deleteFiles(body.parentId, body.type);
  }
}
