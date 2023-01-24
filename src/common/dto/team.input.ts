import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateTeam {
  @Field()
  readonly name: string;

  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateTeam extends PartialType(CreateTeam) {
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
export class UpdateSpecsTeam {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateDetailTeam {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateTagsTeam {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateLikesTeam {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdatePriceTeam {
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
