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
import { PetComment } from 'src/common/entities/comment.model';
import {
  ListPetTeam,
  PetTeam,
} from 'src/common/entities/team.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PetTeamService } from './category.service';
import { PetCommentService } from 'src/comments/categories/pet/category.service';

@Resolver(() => PetTeam)
export class PetTeamResolver {
  constructor(
    private readonly teamService: PetTeamService,
    private readonly commentService: PetCommentService,
  ) {}

  @Mutation(() => PetTeam, { name: 'petCreateTeam' })
  create(@Args('input') input: CreateTeam) {
    return this.teamService.create(input);
  }

  @Mutation(() => PetTeam, { name: 'petUpdateTeam' })
  update(@Args('input') input: UpdateTeam) {
    return this.teamService.update(input);
  }

  @Mutation(() => PetTeam, { name: 'petUpdateDetailTeam' })
  updateDetail(@Args('input') input: UpdateDetailTeam) {
    return this.teamService.updateDetail(input);
  }
  @Mutation(() => PetTeam, { name: 'petUpdateSpecsTeam' })
  updateSpecs(@Args('input') input: UpdateSpecsTeam) {
    return this.teamService.updateSpecs(input);
  }
  @Mutation(() => PetTeam, { name: 'petUpdateTagsTeam' })
  updateTags(@Args('input') input: UpdateTagsTeam) {
    return this.teamService.updateTags(input);
  }
  @Mutation(() => PetTeam, { name: 'petUpdateLikesTeam' })
  updateLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateLikes(input);
  }
  @Mutation(() => PetTeam, { name: 'petUpdateDisLikesTeam' })
  updateDisLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateDisLikes(input);
  }

  // @Mutation(() => PetTeam, {
  //   name: 'petUpdateImageTeam',
  // })
  // updateImage(@Args('input') input: UpdateImageTeam) {
  //   return this.teamService.updateImage(input);
  // }

  @Mutation(() => PetTeam, {
    name: 'petUpdateImageSeoTeam',
  })
  updateImageSeo(@Args('input') input: UpdateImageSeo) {
    return this.teamService.updateImageSeo(input);
  }

  @Mutation(() => String, { name: 'petDeleteTeam' })
  deleteTeam(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.teamService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteTeams' })
  deleteTeamsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)
    return this.teamService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllTeams' })
  deleteAllTeams() {
    this.commentService.deleteAll()
    return this.teamService.deleteAll();
  }

  @Query(() => PetTeam, { name: 'petGetTeam' })
  findOne(@Args('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Query(() => PetTeam, { name: 'petGetTeamBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.teamService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetTeam], { name: 'petGetTeams' })
  findAll() {
    return this.teamService.findAll();
  }

  @Query(() => [PetTeam], { name: 'petGetTeamsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.teamService.findBySiteId(siteId);
  }

  @Query(() => [PetTeam], { name: 'petGetTeamsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.teamService.findByParentId(parentId);
  }

  @Query(() => [PetTeam], { name: 'petGetTeamsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.teamService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPetTeam, { name: 'petGetTeamsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetTeam> {
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

  @ResolveField('comments', () => [PetComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PetTeam) {
    return this.commentService.findByParentId(_id.toString());
  }
}
