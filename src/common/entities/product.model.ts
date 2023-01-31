import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from '../pagination/relay/relay.types';
import { Image, Seo, Tags, Type, UpdateDate } from './site.model';

@ObjectType()
export class Product extends AbstractModel {
  @Field(() => DataProduct)
  readonly data: DataProduct | string;
  @Field()
  readonly slug: string;

  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataProduct {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly thumbnailUrl?: string;

  @Field(() => Type)
  readonly type: Type | string;
  @Field(() => Mark, { nullable: true })
  readonly mark?: Mark | string;
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
@ObjectType()
export class Mark extends Type {}

@ObjectType()
export class Promotion extends Type {}


@ObjectType()
export class HardwareStoreProduct extends Product {}

@ObjectType()
export class PetProduct extends Product {}
@ObjectType()
export class PortfolioProduct extends Product {}

// @ObjectType()
// export class PetAdoption extends Product {}
@ObjectType()
export class FoodProduct extends Product {}

// @ObjectType()
// export class ListWearProduct extends RelayTypes<WearProduct>(WearProduct) {}
// @ObjectType()
// export class ListPetAdoption extends RelayTypes<PetAdoption>(PetAdoption) {}
@ObjectType()
export class ListPetProduct extends RelayTypes<PetProduct>(PetProduct) {}
@ObjectType()
export class ListHardwareStoreProduct extends RelayTypes<HardwareStoreProduct>(HardwareStoreProduct) {}
@ObjectType()
export class ListFoodProduct extends RelayTypes<FoodProduct>(FoodProduct) {}
@ObjectType()
export class ListPortfolioProduct extends RelayTypes<PortfolioProduct>(PortfolioProduct) {}
