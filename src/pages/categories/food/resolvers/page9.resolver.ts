import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  DataPage,
  ListFoodPage9,
  FoodPage10,
  FoodPage9,
} from 'src/common/entities/page.model';
import { FoodPage9Service } from '../services/page9.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage10Service } from '../services/page10.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { FoodProductService } from 'src/products/categories/food/category.service';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage9)
export class FoodPage9Resolver {
  constructor(
    private readonly page9Service: FoodPage9Service,
    private readonly page10Service: FoodPage10Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage9, { name: 'foodCreatePage9' })
  createPage(@Args('input') input: CreatePage) {
    return this.page9Service.create(input);
  }

  @Mutation(() => FoodPage9, { name: 'foodUpdatePage9' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page9Service.update(input);
  }

  @Mutation(() => FoodPage9, { name: 'foodUpdateImagePage9' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page9Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage9' })
  deletePage(@Args('id') id: string) {
    this.page10Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page9Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages9' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page10Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page9Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages9' })
  deleteAllPages() {
    this.page10Service.deleteAll();
    this.productService.deleteAll();
    return this.page9Service.deleteAll();
  }

  @Query(() => FoodPage9, { name: 'foodGetPage9' })
  findPage(@Args('id') id: string) {
    return this.page9Service.findOne(id);
  }

  @Query(() => FoodPage9, { name: 'foodGetPage9BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page9Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage9], { name: 'foodGetPages9' })
  findPages() {
    return this.page9Service.findAll();
  }

  @Query(() => [FoodPage9], { name: 'foodGetPages9ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
  ) {
    return this.page9Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage9], { name: 'foodGetPages9BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page9Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage9], { name: 'foodGetPages9ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page9Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage9, { name: 'foodGetPages9WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage9> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page9Service.findByCursor(
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: FoodPage9) {
    const { type } = data as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage10], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, data }: FoodPage9) {
    return this.page10Service.findByParentId(_id.toString());
  }
}
