import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateService, UpdateDetailService, UpdateLikesService, UpdatePriceService, UpdateService, UpdateSpecsService, UpdateTagsService } from 'src/common/dto/service.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetService } from 'src/common/entities/service.model';
import { ServiceDocument } from 'src/common/entities/service.schema';
import {
  serviceCreated,
  serviceDetailUpdated,
  serviceDisLikesUpdated,
  serviceLikesUpdated,
  servicePriceUpdated,
  serviceSpecsUpdated,
  serviceTagsUpdated,
  serviceUpdated,
  serviceUpdateImage,
} from 'src/common/functions/service';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
@Injectable()
export class PetServiceService {
  constructor(
    @InjectModel(PetService.name, 'petDB')
    private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(input: CreateService) {
    const service = await this.serviceModel.findOne(
      {
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (service) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes un serviceo con este nombre "${input.name}" registrado`,
      );
    }
    const data = new this.serviceModel(serviceCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateService) {
    const service = await this.serviceModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (service) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes un serviceo con este nombre "${input.name}" registrado`,
      );
    }
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateDetail(input: UpdateDetailService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceDetailUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateSpecs(input: UpdateSpecsService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceSpecsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updatePrice(input: UpdatePriceService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      servicePriceUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateTags(input: UpdateTagsService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceTagsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateLikes(input: UpdateLikesService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesService) {
    const data = await this.serviceModel.findOneAndUpdate(
      { _id: input.id },
      serviceDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  // async updateImage(input: UpdateImageService) {
  //   const data = await this.serviceModel.findOneAndUpdate(
  //     { _id: input.id },
  //     serviceUpdateImage(input),
  //     { lean: true, new: true },
  //   );
  //   return data;
  // }

  async deleteOne(id: string) {
    await this.serviceModel.deleteOne({ _id: id });
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.serviceModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.serviceModel.deleteMany({ 'data.siteId': { $in: ids } });
    return 'pages delete';
  }
  async deleteManyByParentId(ids: string[]) {
    await this.serviceModel.deleteMany({ parentId: { $in: ids } });
    return 'pages delete';
  }

  async deleteAll() {
    await this.serviceModel.deleteMany();
    return 'pages delete';
  }

  findAll() {
    const data = this.serviceModel.find({});
    return data;
  }

  findBySiteId(siteId: string) {
    const data = this.serviceModel.find({ 'data.siteId': siteId });
    return data;
  }

  findByParentId(parentId: string) {
    const data = this.serviceModel.find({ parentId: parentId });

    return data;
  }

  async findOne(id: string) {
    const document = await this.serviceModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.serviceModel.findOne({
      slug: slug,
      'data.siteId': siteId,
    });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.serviceModel.find({ parentId: parentId }).sort({ 'data.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.serviceModel.count({ parentId: parentId });
    const data = await this.serviceModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'data.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
