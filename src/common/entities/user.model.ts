import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { Image, UpdateDate } from './site.model';

@ObjectType()
export class User extends AbstractModel {
  @Field(() => DataUser)
  readonly dataUser: DataUser | string;
  @Field()
  readonly email: string;
}


@ObjectType()
export class DataUser {
  @Field()
  readonly password: string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  @Field()
  readonly username: string;
  @Field()
  readonly picture: string;
  
  @Field()
  readonly role: string;
  
  @Field(() => Boolean)
  readonly status: boolean;
  @Field(() => OAuth)
  readonly oAuth: OAuth | string;
  @Field()
  readonly siteId: string;
}

@ObjectType()
export class OAuth {
  @Field()
  provider: string
}

@ObjectType()
export class MarketingUser extends User {}
@ObjectType()
export class PetUser extends User {}
@ObjectType()
export class PortfolioUser extends User {}
@ObjectType()
export class HardwareStoreUser extends User {}
@ObjectType()
export class FoodUser extends User {}
