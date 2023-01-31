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
import { PortfolioComment } from 'src/common/entities/comment.model';
import {
  ListPortfolioTeam,
  PortfolioTeam,
} from 'src/common/entities/team.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PortfolioTeamService } from './category.service';
import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';

@Resolver(() => PortfolioTeam)
export class PortfolioTeamResolver {
  constructor(
    private readonly teamService: PortfolioTeamService,
    private readonly commentService: PortfolioCommentService,
  ) {}

  @Mutation(() => PortfolioTeam, { name: 'portfolioCreateTeam' })
  create(@Args('input') input: CreateTeam) {
    return this.teamService.create(input);
  }

  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateTeam' })
  update(@Args('input') input: UpdateTeam) {
    return this.teamService.update(input);
  }

  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateDetailTeam' })
  updateDetail(@Args('input') input: UpdateDetailTeam) {
    return this.teamService.updateDetail(input);
  }
  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateSpecsTeam' })
  updateSpecs(@Args('input') input: UpdateSpecsTeam) {
    return this.teamService.updateSpecs(input);
  }
  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateTagsTeam' })
  updateTags(@Args('input') input: UpdateTagsTeam) {
    return this.teamService.updateTags(input);
  }
  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateLikesTeam' })
  updateLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateLikes(input);
  }
  @Mutation(() => PortfolioTeam, { name: 'portfolioUpdateDisLikesTeam' })
  updateDisLikes(@Args('input') input: UpdateLikesTeam) {
    return this.teamService.updateDisLikes(input);
  }

  // @Mutation(() => PortfolioTeam, {
  //   name: 'portfolioUpdateImageTeam',
  // })
  // updateImage(@Args('input') input: UpdateImageTeam) {
  //   return this.teamService.updateImage(input);
  // }

  @Mutation(() => PortfolioTeam, {
    name: 'portfolioUpdateImageSeoTeam',
  })
  updateImageSeo(@Args('input') input: UpdateImageSeo) {
    return this.teamService.updateImageSeo(input);
  }

  @Mutation(() => String, { name: 'portfolioDeleteTeam' })
  deleteTeam(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.teamService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteTeams' })
  deleteTeamsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)
    return this.teamService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllTeams' })
  deleteAllTeams() {
    this.commentService.deleteAll()
    return this.teamService.deleteAll();
  }

  @Query(() => PortfolioTeam, { name: 'portfolioGetTeam' })
  findOne(@Args('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Query(() => PortfolioTeam, { name: 'portfolioGetTeamBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.teamService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioTeam], { name: 'portfolioGetTeams' })
  findAll() {
    return this.teamService.findAll();
  }

  @Query(() => [PortfolioTeam], { name: 'portfolioGetTeamsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.teamService.findBySiteId(siteId);
  }

  @Query(() => [PortfolioTeam], { name: 'portfolioGetTeamsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.teamService.findByParentId(parentId);
  }

  @Query(() => [PortfolioTeam], { name: 'portfolioGetTeamsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.teamService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioTeam, { name: 'portfolioGetTeamsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioTeam> {
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

  @ResolveField('comments', () => [PortfolioComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PortfolioTeam) {
    return this.commentService.findByParentId(_id.toString());
  }
}
