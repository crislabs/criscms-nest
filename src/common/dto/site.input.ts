import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateSite {
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateSite extends OmitType(CreateSite, ["type"]) {
  @Field()
  readonly id: string;
}

@InputType()
export class UpdateDB {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly type: string[];
}
@InputType()
export class UpdateAdminSite {
  @Field()
  readonly id: string;
  @Field(() => [InputAdmin])
  readonly admin: InputAdmin[];
}
@InputType()
export class UpdateImage {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly type?: string;
  @Field()
  readonly uid: string;
  @Field(() => InputImage)
  readonly images?: InputImage | string;
}

@InputType()
export class UpdateImageProduct {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly type?: string;
  @Field()
  readonly uid: string;
  @Field(() => [InputImage])
  readonly images?: InputImage[];
}
@InputType()
export class UpdateImageAdoption extends UpdateImageProduct {}

@InputType()
export class UpdateImageSeo {
  @Field({ nullable: true })
  readonly id: string;
  @Field()
  readonly src: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class InputImage {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@InputType()
export class InputAdmin {
  @Field()
  readonly privilege: string;
  @Field()
  readonly sid: string;
}
