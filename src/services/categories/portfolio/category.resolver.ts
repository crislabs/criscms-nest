import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
// import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
import {
  CreateService,
  UpdateDetailService,
  UpdateLikesService,
  UpdatePriceService,
  UpdateService,
  UpdateSpecsService,
  UpdateTagsService,
} from 'src/common/dto/service.input';
// import { UpdateImageService } from 'src/common/dto/site.input';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { ListPortfolioService, PortfolioService } from 'src/common/entities/service.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PortfolioServiceService } from './category.service';

@Resolver(() => PortfolioService)
export class PortfolioServiceResolver {
  constructor(
    private readonly serviceService: PortfolioServiceService,
    private readonly commentService: PortfolioCommentService,
  ) {}

  @Mutation(() => PortfolioService, { name: 'portfolioCreateService' })
  create(@Args('input') input: CreateService) {
    return this.serviceService.create(input);
  }

  @Mutation(() => PortfolioService, { name: 'portfolioUpdateService' })
  update(@Args('input') input: UpdateService) {
    return this.serviceService.update(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdateDetailService' })
  updateDetail(@Args('input') input: UpdateDetailService) {
    return this.serviceService.updateDetail(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdatePriceService' })
  updatePrice(@Args('input') input: UpdatePriceService) {
    return this.serviceService.updatePrice(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdateSpecsService' })
  updateSpecs(@Args('input') input: UpdateSpecsService) {
    return this.serviceService.updateSpecs(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdateTagsService' })
  updateTags(@Args('input') input: UpdateTagsService) {
    return this.serviceService.updateTags(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdateLikesService' })
  updateLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateLikes(input);
  }
  @Mutation(() => PortfolioService, { name: 'portfolioUpdateDisLikesService' })
  updateDisLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateDisLikes(input);
  }

  // @Mutation(() => PortfolioService, {
  //   name: 'portfolioUpdateImageService',
  // })
  // updateImage(@Args('input') input: UpdateImageService) {
  //   return this.serviceService.updateImage(input);
  // }

  @Mutation(() => String, { name: 'portfolioDeleteService' })
  delete(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.serviceService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteServices' })
  deleteById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)

    return this.serviceService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllServices' })
  deleteAll() {
    this.commentService.deleteAll()
    return this.serviceService.deleteAll();
  }

  @Query(() => PortfolioService, { name: 'portfolioGetService' })
  findOne(@Args('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Query(() => PortfolioService, { name: 'portfolioGetServiceBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.serviceService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioService], { name: 'portfolioGetServices' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => [PortfolioService], { name: 'portfolioGetServicesBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.serviceService.findBySiteId(siteId);
  }

  @Query(() => [PortfolioService], { name: 'portfolioGetServicesByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.serviceService.findByParentId(parentId);
  }

  @Query(() => [PortfolioService], { name: 'portfolioGetServicesByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.serviceService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioService, { name: 'portfolioGetServicesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioService> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.serviceService.findByCursor(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('comments', () => [PortfolioComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PortfolioService) {
    return this.commentService.findByParentId(_id.toString());
  }
}
