import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserServiceInterface } from './user-service.interface.js';
import { AppComponent } from '../../types/app-component.type.js';
import UserService from './user.service.js';
import { UserEntity } from './user.entity.js';
import { UserModel } from '../entities/index.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(AppComponent.UserModel).toConstantValue(UserModel);

  return userContainer;
}
