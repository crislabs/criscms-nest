import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeam, UpdateTeam, UpdateDetailTeam, UpdateLikesTeam, UpdateSpecsTeam, UpdateTagsTeam } from 'src/common/dto/team.input';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageSeo, UpdateImageProduct } from 'src/common/dto/site.input';
import { PortfolioTeam } from 'src/common/entities/team.model';
import { TeamDocument } from 'src/common/entities/team.schema';
// import { PortfolioTeam } from 'src/common/entities/product.model';
// import { ProductDocument } from 'src/common/entities/product.schema';
import {
  teamCreated,
  teamDetailUpdated,
  teamDisLikesUpdated,
  teamLikesUpdated,
  teamSpecsUpdated,
  teamTagsUpdated,
  teamUpdated,
  teamUpdateImage,
  teamUpdateImageSeo,
} from 'src/common/functions/team';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
@Injectable()
export class PortfolioTeamService {
  constructor(
    @InjectModel(PortfolioTeam.name, 'portfolioDB')
    private teamModel: Model<TeamDocument>,
  ) {}

  async create(input: CreateTeam) {
    const team = await this.teamModel.findOne(
      {
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (team) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes una adopción con este nombre "${input.name}" registrado`,
      );
    }
    const data = new this.teamModel(teamCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateTeam) {
    const team = await this.teamModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (team) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes una adopción con este nombre "${input.name}" registrado`,
      );
    }
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDetail(input: UpdateDetailTeam) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamDetailUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateSpecs(input: UpdateSpecsTeam) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamSpecsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateTags(input: UpdateTagsTeam) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamTagsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateLikes(input: UpdateLikesTeam) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesTeam) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  // async updateImage(input: UpdateImageTeam) {
  //   const data = await this.teamModel.findOneAndUpdate(
  //     { _id: input.id },
  //     teamUpdateImage(input),
  //     { lean: true, new: true },
  //   );
  //   return data;
  // }
  async updateImageSeo(input: UpdateImageSeo) {
    const data = await this.teamModel.findOneAndUpdate(
      { _id: input.id },
      teamUpdateImageSeo(input),
      { lean: true, new: true },
    );
    return data;
  }

  async deleteOne(id: string) {
    await this.teamModel.deleteOne({ _id: id });
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.teamModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.teamModel.deleteMany({ 'data.siteId': { $in: ids } });
    return 'teams delete';
  }
  async deleteManyByParentId(ids: string[]) {
    await this.teamModel.deleteMany({ parentId: { $in: ids } });
    return 'teams delete';
  }

  async deleteAll() {
    await this.teamModel.deleteMany();
    return 'teams delete';
  }

  findAll() {
    const data = this.teamModel.find({});
    return data;
  }

  findBySiteId(siteId: string) {
    const data = this.teamModel.find({ 'data.siteId': siteId });
    return data;
  }

  findByParentId(parentId: string) {
    const data = this.teamModel.find({ parentId: parentId });

    return data;
  }

  async findOne(id: string) {
    const document = await this.teamModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.teamModel.findOne({
      slug: slug,
      'dataTeam.siteId': siteId,
    });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.teamModel.find({ parentId: parentId }).sort({ 'data.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.teamModel.count({ parentId: parentId });
    const data = await this.teamModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'data.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
