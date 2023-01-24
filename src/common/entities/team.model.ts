import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Image, Seo, Tags, UpdateDate } from './site.model';

@ObjectType()
export class Team extends AbstractModel {
  @Field(() => DataTeam)
  readonly data: DataTeam | string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly slug: string;
}
@ObjectType()
export class DataTeam {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly thumbnailUrl?: string;
  
  @Field({ nullable: true })
  readonly siteId: string;
  @Field(() => [SocialMedia])
  readonly socialMedia: SocialMedia[];
  
 
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  
}

@ObjectType()
export class SocialMedia {
  @Field()
  readonly label: string
  @Field()
  readonly url: string
}

// @ObjectType()
// export class FoodTeam extends Team {}
// @ObjectType()
// export class MarketingTeam extends Team {}
@ObjectType()
export class PetTeam extends Team {}
@ObjectType()
export class ListPetTeam extends RelayTypes<PetTeam>(PetTeam) {}
@ObjectType()
export class FoodTeam extends Team {}
@ObjectType()
export class ListFoodTeam extends RelayTypes<FoodTeam>(FoodTeam) {}
@ObjectType()
export class PortfolioTeam extends Team {}
@ObjectType()
export class ListPortfolioTeam extends RelayTypes<PortfolioTeam>(PortfolioTeam) {}
@ObjectType()
export class HardwareStoreTeam extends Team {}
@ObjectType()
export class ListHardwareStoreTeam extends RelayTypes<HardwareStoreTeam>(HardwareStoreTeam) {}
