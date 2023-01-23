import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateService {
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
export class UpdateService extends PartialType(CreateService) {
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
export class UpdateSpecsService {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateDetailService {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateTagsService {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateLikesService {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdatePriceService {
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
