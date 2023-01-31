import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { FoodCommentService } from 'src/comments/categories/food/category.service';
// import { FoodCommentService } from 'src/comments/categories/food/category.service';
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
import { FoodComment } from 'src/common/entities/comment.model';
import { ListFoodService, FoodService } from 'src/common/entities/service.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { FoodServiceService } from './category.service';

@Resolver(() => FoodService)
export class FoodServiceResolver {
  constructor(
    private readonly serviceService: FoodServiceService,
    private readonly commentService: FoodCommentService,
  ) {}

  @Mutation(() => FoodService, { name: 'foodCreateService' })
  create(@Args('input') input: CreateService) {
    return this.serviceService.create(input);
  }

  @Mutation(() => FoodService, { name: 'foodUpdateService' })
  update(@Args('input') input: UpdateService) {
    return this.serviceService.update(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdateDetailService' })
  updateDetail(@Args('input') input: UpdateDetailService) {
    return this.serviceService.updateDetail(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdatePriceService' })
  updatePrice(@Args('input') input: UpdatePriceService) {
    return this.serviceService.updatePrice(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdateSpecsService' })
  updateSpecs(@Args('input') input: UpdateSpecsService) {
    return this.serviceService.updateSpecs(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdateTagsService' })
  updateTags(@Args('input') input: UpdateTagsService) {
    return this.serviceService.updateTags(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdateLikesService' })
  updateLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateLikes(input);
  }
  @Mutation(() => FoodService, { name: 'foodUpdateDisLikesService' })
  updateDisLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateDisLikes(input);
  }

  // @Mutation(() => FoodService, {
  //   name: 'foodUpdateImageService',
  // })
  // updateImage(@Args('input') input: UpdateImageService) {
  //   return this.serviceService.updateImage(input);
  // }

  @Mutation(() => String, { name: 'foodDeleteService' })
  delete(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.serviceService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteServices' })
  deleteById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)

    return this.serviceService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllServices' })
  deleteAll() {
    this.commentService.deleteAll()
    return this.serviceService.deleteAll();
  }

  @Query(() => FoodService, { name: 'foodGetService' })
  findOne(@Args('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Query(() => FoodService, { name: 'foodGetServiceBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.serviceService.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodService], { name: 'foodGetServices' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => [FoodService], { name: 'foodGetServicesBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.serviceService.findBySiteId(siteId);
  }

  @Query(() => [FoodService], { name: 'foodGetServicesByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.serviceService.findByParentId(parentId);
  }

  @Query(() => [FoodService], { name: 'foodGetServicesByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.serviceService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodService, { name: 'foodGetServicesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodService> {
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

  @ResolveField('comments', () => [FoodComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: FoodService) {
    return this.commentService.findByParentId(_id.toString());
  }
}
