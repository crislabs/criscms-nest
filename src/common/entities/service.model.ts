import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from '../pagination/relay/relay.types';
import { Promotion } from './product.model';
import { Image, Seo, Tags, Type, UpdateDate } from './site.model';

@ObjectType()
export class Service extends AbstractModel {
  @Field(() => DataService)
  readonly data: DataService | string;
  @Field()
  readonly slug: string;

  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataService {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly thumbnailUrl?: string;

  @Field(() => Type)
  readonly type: Type | string;
  // @Field(() => Mark, { nullable: true })
  // readonly mark?: Mark | string;
  @Field({ nullable: true })
  readonly inStock?: number;
  @Field({ nullable: true })
  readonly price?: number;
  @Field({ nullable: true })
  readonly discountPrice?: number;
  // @Field()
  // readonly description: string;
  @Field(() => Promotion, { nullable: true })
  readonly promotion?: Promotion | string;

  @Field({ nullable: true })
  readonly details?: string;

  @Field({ nullable: true })
  readonly featured?: string;

  @Field({ nullable: true })
  readonly specs?: string;

  @Field(() => [Tags], { nullable: true })
  readonly tags?: Tags[];

  @Field(() => [Image], { nullable: true })
  readonly images?: Image[];

  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;

  @Field(() => [String], { nullable: true })
  readonly likes?: string[];

  @Field()
  readonly siteId: string;
}

// @ObjectType()
// export class Type {
//   @Field()
//   label: string;
//   @Field()
//   slug: string;
// }
// @ObjectType()
// export class Mark extends Type {}

// @ObjectType()
// export class Promotion extends Type {}


// @ObjectType()
// export class HardwareStoreService extends Service {}

@ObjectType()
export class PetService extends Service {}

@ObjectType()
export class ListPetService extends RelayTypes<PetService>(PetService) {}

@ObjectType()
export class PortfolioService extends Service {}

@ObjectType()
export class ListPortfolioService extends RelayTypes<PortfolioService>(PortfolioService) {}

@ObjectType()
export class FoodService extends Service {}

@ObjectType()
export class ListFoodService extends RelayTypes<FoodService>(FoodService) {}
