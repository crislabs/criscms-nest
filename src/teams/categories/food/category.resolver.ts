import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { CreateTeam, UpdateTeam, UpdateDetailTeam, UpdateLikesTeam, UpdateSpecsTeam, UpdateTagsTeam } from 'src/common/dto/team.input';

import { UpdateImageSeo, } from 'src/common/dto/site.input';
import { FoodComment } from 'src/common/entities/comment.model';
import {
  ListFoodTeam,
  FoodTeam,
} from 'src/common/entities/team.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { FoodTeamService } from './category.service';
import { FoodCommentService } from 'src/comments/categories/food/category.service';

@Resolver(() => FoodTeam)
export class FoodTeamResolver {
  constructor(
    private readonly teamService: FoodTeamService,
    private readonly commentService: FoodCommentService,
  ) {}

  @Mutation(() => FoodTeam, { name: 'foodCreateTeam' })
  create(@Args('input') input: CreateTeam) {
    return this.teamService.create(input);
  }

  @Mutation(() => FoodTeam, { name: 'foodUpdateTeam' })
  update(@Args('input') input: UpdateTeam) {
    return this.teamService.update(input);
  }

  @Mutation(() => FoodTeam, { name: 'foodUpdateDetailTeam' })
  updateDetail(@Args('input') input: UpdateDetailTeam) {
    return this.teamService.updateDetail(input);
  }
  @Mutation(() => FoodTeam, { name: 'foodUpdateSpecsTeam' })
  updateSpecs(@Args('input') input: UpdateSpecsTeam) {
    return this.teamService.updateSpecs(input);
  }
  @Mutation(() => FoodTeam, { name: 'foodUpdateTagsTeam' })
  updateTags(@Args('input') input: UpdateTagsTeam) {
    return this.teamService.updateTags(input);
  }
  @Mutation(() => FoodTeam, { name: 'foodUpdateLikesTeam' })
  updateLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateLikes(input);
  }
  @Mutation(() => FoodTeam, { name: 'foodUpdateDisLikesTeam' })
  updateDisLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateDisLikes(input);
  }

  // @Mutation(() => FoodTeam, {
  //   name: 'foodUpdateImageTeam',
  // })
  // updateImage(@Args('input') input: UpdateImageTeam) {
  //   return this.teamService.updateImage(input);
  // }

  @Mutation(() => FoodTeam, {
    name: 'foodUpdateImageSeoTeam',
  })
  updateImageSeo(@Args('input') input: UpdateImageSeo) {
    return this.teamService.updateImageSeo(input);
  }

  @Mutation(() => String, { name: 'foodDeleteTeam' })
  deleteTeam(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.teamService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteTeams' })
  deleteTeamsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)
    return this.teamService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllTeams' })
  deleteAllTeams() {
    this.commentService.deleteAll()
    return this.teamService.deleteAll();
  }

  @Query(() => FoodTeam, { name: 'foodGetTeam' })
  findOne(@Args('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Query(() => FoodTeam, { name: 'foodGetTeamBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.teamService.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodTeam], { name: 'foodGetTeams' })
  findAll() {
    return this.teamService.findAll();
  }

  @Query(() => [FoodTeam], { name: 'foodGetTeamsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.teamService.findBySiteId(siteId);
  }

  @Query(() => [FoodTeam], { name: 'foodGetTeamsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.teamService.findByParentId(parentId);
  }

  @Query(() => [FoodTeam], { name: 'foodGetTeamsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.teamService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodTeam, { name: 'foodGetTeamsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodTeam> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.teamService.findByCursor(
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
  getComments(@Parent() { _id }: FoodTeam) {
    return this.commentService.findByParentId(_id.toString());
  }
}
