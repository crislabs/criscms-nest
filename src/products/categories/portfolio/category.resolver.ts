import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
// import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdatePriceProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageProduct } from 'src/common/dto/site.input';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { ListPortfolioProduct, PortfolioProduct } from 'src/common/entities/product.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PortfolioProductService } from './category.service';

@Resolver(() => PortfolioProduct)
export class PortfolioProductResolver {
  constructor(
    private readonly productService: PortfolioProductService,
    private readonly commentService: PortfolioCommentService,
  ) {}

  @Mutation(() => PortfolioProduct, { name: 'portfolioCreateProduct' })
  create(@Args('input') input: CreateProduct) {
    return this.productService.create(input);
  }

  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateProduct' })
  update(@Args('input') input: UpdateProduct) {
    return this.productService.update(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateDetailProduct' })
  updateDetail(@Args('input') input: UpdateDetailProduct) {
    return this.productService.updateDetail(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdatePriceProduct' })
  updatePrice(@Args('input') input: UpdatePriceProduct) {
    return this.productService.updatePrice(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateSpecsProduct' })
  updateSpecs(@Args('input') input: UpdateSpecsProduct) {
    return this.productService.updateSpecs(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateTagsProduct' })
  updateTags(@Args('input') input: UpdateTagsProduct) {
    return this.productService.updateTags(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateLikesProduct' })
  updateLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateLikes(input);
  }
  @Mutation(() => PortfolioProduct, { name: 'portfolioUpdateDisLikesProduct' })
  updateDisLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateDisLikes(input);
  }

  @Mutation(() => PortfolioProduct, {
    name: 'portfolioUpdateImageProduct',
  })
  updateImage(@Args('input') input: UpdateImageProduct) {
    return this.productService.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeleteProduct' })
  delete(@Args('id') id: string) {
    this.commentService.deleteManyByParentId([id])
    return this.productService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteProducts' })
  deleteById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    this.commentService.deleteManyByParentId(ids)

    return this.productService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllProducts' })
  deleteAll() {
    this.commentService.deleteAll()
    return this.productService.deleteAll();
  }

  @Query(() => PortfolioProduct, { name: 'portfolioGetProduct' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => PortfolioProduct, { name: 'portfolioGetProductBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.productService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioProduct], { name: 'portfolioGetProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [PortfolioProduct], { name: 'portfolioGetProductsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.productService.findBySiteId(siteId);
  }

  @Query(() => [PortfolioProduct], { name: 'portfolioGetProductsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.productService.findByParentId(parentId);
  }

  @Query(() => [PortfolioProduct], { name: 'portfolioGetProductsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.productService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioProduct, { name: 'portfolioGetProductsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioProduct> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.productService.findByCursor(
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
  getComments(@Parent() { _id }: PortfolioProduct) {
    return this.commentService.findByParentId(_id.toString());
  }
}
