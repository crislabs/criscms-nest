import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdoption, UpdateAdoption, UpdateDetailAdoption, UpdateLikesAdoption, UpdateSpecsAdoption, UpdateTagsAdoption } from 'src/common/dto/adoption.input';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageAdoption, UpdateImageProduct } from 'src/common/dto/site.input';
import { PetAdoption } from 'src/common/entities/adoption.model';
import { AdoptionDocument } from 'src/common/entities/adoption.schema';
// import { PetAdoption } from 'src/common/entities/product.model';
// import { ProductDocument } from 'src/common/entities/product.schema';
import {
  adoptionCreated,
  adoptionDetailUpdated,
  adoptionDisLikesUpdated,
  adoptionLikesUpdated,
  adoptionSpecsUpdated,
  adoptionTagsUpdated,
  adoptionUpdated,
  adoptionUpdateImage,
} from 'src/common/functions/adoption';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
@Injectable()
export class PetAdoptionService {
  constructor(
    @InjectModel(PetAdoption.name, 'petDB')
    private adoptionModel: Model<AdoptionDocument>,
  ) {}

  async create(input: CreateAdoption) {
    const adoption = await this.adoptionModel.findOne(
      {
        slug: slug(input.title),
        'dataAdoption.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (adoption) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const data = new this.adoptionModel(adoptionCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateAdoption) {
    const adoption = await this.adoptionModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.title),
        'dataAdoption.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (adoption) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDetail(input: UpdateDetailAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionDetailUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateSpecs(input: UpdateSpecsAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionSpecsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateTags(input: UpdateTagsAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionTagsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateLikes(input: UpdateLikesAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateImage(input: UpdateImageAdoption) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      adoptionUpdateImage(input),
      { lean: true, new: true },
    );
    return data;
  }

  async deleteOne(id: string) {
    await this.adoptionModel.deleteOne({ _id: id });
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.adoptionModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.adoptionModel.deleteMany({ 'dataAdoption.siteId': { $in: ids } });
    return 'adoptions delete';
  }
  async deleteManyByParentId(ids: string[]) {
    await this.adoptionModel.deleteMany({ parentId: { $in: ids } });
    return 'adoptions delete';
  }

  async deleteAll() {
    await this.adoptionModel.deleteMany();
    return 'adoptions delete';
  }

  findAll() {
    const data = this.adoptionModel.find({});
    return data;
  }

  findBySiteId(siteId: string) {
    const data = this.adoptionModel.find({ 'dataAdoption.siteId': siteId });
    return data;
  }

  findByParentId(parentId: string) {
    const data = this.adoptionModel.find({ parentId: parentId });

    return data;
  }

  async findOne(id: string) {
    const document = await this.adoptionModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.adoptionModel.findOne({
      slug: slug,
      'dataAdoption.siteId': siteId,
    });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.adoptionModel.find({ parentId: parentId }).sort({ 'dataAdoption.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.adoptionModel.count({ parentId: parentId });
    const data = await this.adoptionModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'dataAdoption.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
