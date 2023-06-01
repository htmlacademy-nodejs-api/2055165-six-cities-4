import typegoose, { Ref, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import type { User } from '../../types/user.type.js';
import { UserStatus } from '../../types/user-status.type.js';
import { createSHA256 } from '../../core/utils/common.js';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({required: true})
  public username!: string;

  @prop({required: true, unique: true})
  public email!: string;

  @prop({required: false, default: ''})
  public avatarPath!: string;

  @prop({required: true, type: () => String, enum: UserStatus})
  public status!: UserStatus;

  @prop({required: true, type: () => [String]})
  public favorites!: Ref<RentOfferEntity>[];

  @prop({required: true})
  private password?: string;

  constructor(userData: User) {
    super();

    this.username = userData.username;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.status = userData.status;
    this.favorites = [];
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
