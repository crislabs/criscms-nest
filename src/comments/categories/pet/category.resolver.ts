import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateComment,
  UpdateComment,
  UpdateLikesComment,
} from 'src/common/dto/comment.input';
import { PetComment } from 'src/common/entities/comment.model';
import { PetCommentService } from './category.service';

@Resolver(() => PetComment)
export class PetCommentResolver {
  constructor(private readonly commentService: PetCommentService) {}

  @Mutation(() => PetComment, { name: 'petCreateComment' })
  create(@Args('input') input: CreateComment) {
    const data = this.commentService.create(input);
    return data;
  }

  @Mutation(() => PetComment, { name: 'petUpdateComment' })
  update(@Args('input') input: UpdateComment) {
    return this.commentService.update(input);
  }

  @Mutation(() => PetComment, { name: 'petUpdateLikesComment' })
  updateLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateLikes(input);
  }
  @Mutation(() => PetComment, { name: 'petUpdateDisLikesComment' })
  updateDisLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateDisLikes(input);
  }

  // @Mutation(() => PetArticle, { name: 'petUpdateImageArticle' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.petService.updateImage(input);
  // }

  @Mutation(() => String, { name: 'petDeleteComment' })
  delete(@Args('id') id: string) {
    return this.commentService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteComments' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.commentService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllComments' })
  deleteAllArticles() {
    return this.commentService.deleteAll();
  }

  @Query(() => PetComment, { name: 'petGetComment' })
  getComment(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }
  // @Query(() => PetArticle, { name: 'petGetArticleBySlug' })
  // getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
  //   return this.petService.findOneBySlug(slug, siteId);
  // }

  // @Query(() => [PetArticle], { name: 'petGetArticles' })
  // getArticles() {
  //   return this.petService.findAll();
  // }

  @Query(() => [PetComment], { name: 'petGetCommentsByParentId' })
  getByParentId(@Args('parentId') parentId: string) {
    return this.commentService.findByParentId(parentId);
  }
  // // @Query(() => [Article], { name: 'petGetArticlesBySiteId' })
  // // getArticlesBySiteId(@Args('siteId') siteId: string) {
  // //   return this.petService.getArticlesBySiteId(siteId);
  // // }

  // @Query(() => ListPetArticle, { name: 'petGetArticlesWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('parentId') parentId: string,
  // ): Promise<ListPetArticle> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.petService.findByCursor(
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
