import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateComment,
  UpdateComment,
  UpdateLikesComment,
} from 'src/common/dto/comment.input';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { PortfolioCommentService } from './category.service';

@Resolver(() => PortfolioComment)
export class PortfolioCommentResolver {
  constructor(private readonly commentService: PortfolioCommentService) {}

  @Mutation(() => PortfolioComment, { name: 'portfolioCreateComment' })
  create(@Args('input') input: CreateComment) {
    const data = this.commentService.create(input);
    return data;
  }

  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateComment' })
  update(@Args('input') input: UpdateComment) {
    return this.commentService.update(input);
  }

  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateLikesComment' })
  updateLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateLikes(input);
  }
  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateDisLikesComment' })
  updateDisLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateDisLikes(input);
  }

  // @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateImageArticle' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.portfolioService.updateImage(input);
  // }

  @Mutation(() => String, { name: 'portfolioDeleteComment' })
  delete(@Args('id') id: string) {
    return this.commentService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteComments' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.commentService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllComments' })
  deleteAllArticles() {
    return this.commentService.deleteAll();
  }

  @Query(() => PortfolioComment, { name: 'portfolioGetComment' })
  getComment(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }
  // @Query(() => PortfolioArticle, { name: 'portfolioGetArticleBySlug' })
  // getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
  //   return this.portfolioService.findOneBySlug(slug, siteId);
  // }

  // @Query(() => [PortfolioArticle], { name: 'portfolioGetArticles' })
  // getArticles() {
  //   return this.portfolioService.findAll();
  // }

  @Query(() => [PortfolioComment], { name: 'portfolioGetCommentsByParentId' })
  getByParentId(@Args('parentId') parentId: string) {
    return this.commentService.findByParentId(parentId);
  }
  // // @Query(() => [Article], { name: 'portfolioGetArticlesBySiteId' })
  // // getArticlesBySiteId(@Args('siteId') siteId: string) {
  // //   return this.portfolioService.getArticlesBySiteId(siteId);
  // // }

  // @Query(() => ListPortfolioArticle, { name: 'portfolioGetArticlesWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('parentId') parentId: string,
  // ): Promise<ListPortfolioArticle> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.portfolioService.findByCursor(
  //     {
  //       limit,
  //       offset,
  //     },
  //     parentId,
  //   );
  //   const page = connectionFromArraySlice(data, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }
}
