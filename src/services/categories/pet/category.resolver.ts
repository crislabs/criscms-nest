import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PetCommentService } from 'src/comments/categories/pet/category.service';
// import { PetCommentService } from 'src/comments/categories/pet/category.service';
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
import { PetComment } from 'src/common/entities/comment.model';
import { ListPetService, PetService } from 'src/common/entities/service.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PetServiceService } from './category.service';

@Resolver(() => PetService)
export class PetServiceResolver {
  constructor(
    private readonly serviceService: PetServiceService,
    private readonly commentService: PetCommentService,
  ) {}

  @Mutation(() => PetService, { name: 'petCreateService' })
  create(@Args('input') input: CreateService) {
    return this.serviceService.create(input);
  }

  @Mutation(() => PetService, { name: 'petUpdateService' })
  update(@Args('input') input: UpdateService) {
    return this.serviceService.update(input);
  }
  @Mutation(() => PetService, { name: 'petUpdateDetailService' })
  updateDetail(@Args('input') input: UpdateDetailService) {
    return this.serviceService.updateDetail(input);
  }
  @Mutation(() => PetService, { name: 'petUpdatePriceService' })
  updatePrice(@Args('input') input: UpdatePriceService) {
    return this.serviceService.updatePrice(input);
  }
  @Mutation(() => PetService, { name: 'petUpdateSpecsService' })
  updateSpecs(@Args('input') input: UpdateSpecsService) {
    return this.serviceService.updateSpecs(input);
  }
  @Mutation(() => PetService, { name: 'petUpdateTagsService' })
  updateTags(@Args('input') input: UpdateTagsService) {
    return this.serviceService.updateTags(input);
  }
  @Mutation(() => PetService, { name: 'petUpdateLikesService' })
  updateLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateLikes(input);
  }
  @Mutation(() => PetService, { name: 'petUpdateDisLikesService' })
  updateDisLikes(@Args('input') input: UpdateLikesService) {
    return this.serviceService.updateDisLikes(input);
  }

  // @Mutation(() => PetService, {
  //   name: 'petUpdateImageService',
  // })
  // updateImage(@Args('input') input: UpdateImageService) {
  //   return this.serviceService.updateImage(input);
  // }

  @Mutation(() => String, { name: 'petDeleteService' })
  delete(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.serviceService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteServices' })
  deleteById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)

    return this.serviceService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllServices' })
  deleteAll() {
    this.commentService.deleteAll()
    return this.serviceService.deleteAll();
  }

  @Query(() => PetService, { name: 'petGetService' })
  findOne(@Args('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Query(() => PetService, { name: 'petGetServiceBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.serviceService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetService], { name: 'petGetServices' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => [PetService], { name: 'petGetServicesBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.serviceService.findBySiteId(siteId);
  }

  @Query(() => [PetService], { name: 'petGetServicesByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.serviceService.findByParentId(parentId);
  }

  @Query(() => [PetService], { name: 'petGetServicesByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.serviceService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPetService, { name: 'petGetServicesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetService> {
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

  @ResolveField('comments', () => [PetComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PetService) {
    return this.commentService.findByParentId(_id.toString());
  }
}
