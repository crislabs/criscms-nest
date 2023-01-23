import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateAdoption {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly uid: string;

  @Field()
  readonly type: string;
}

@InputType()
export class UpdateAdoption extends PartialType(CreateAdoption) {
  @Field()
  readonly id: string;
  // @Field(() => [String])
  // readonly tags: string[];
  // @Field()
  // readonly details: string;
  // @Field()
  // readonly featured: string;
  // @Field()
  // readonly specs: string;
}

@InputType()
export class UpdateSpecsAdoption {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateDetailAdoption {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateTagsAdoption {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateLikesAdoption {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdatePriceAdoption {
  @Field()
  readonly id: string;
  @Field()
  readonly price: string;
  @Field()
  readonly discountPrice: string;
  @Field()
  readonly inStock: string;
  @Field()
  readonly uid: string;
}
