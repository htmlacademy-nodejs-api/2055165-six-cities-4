import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.type.js';
import { HttpMethod } from '../../types/http-method.type.js';
import { UserServiceInterface } from './user-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { createSHA256, fillRDO } from '../../core/utils/common.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import AuthUserRDO from './rdo/auth-user.rdo.js';
import RentOfferService from '../rent-offer/rent-offer.service.js';
import RentOfferBasicRDO from '../rent-offer/rdo/rent-offer-basic.rdo.js';

@injectable()
export default class UserController extends Controller {
  constructor(
  @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
  @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
  @inject(AppComponent.RentOfferServiceInterface) private readonly rentOfferService: RentOfferService,
  @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for User Controller…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.register});
    this.addRoute({path: '/auth', method: HttpMethod.Get, handler: this.checkAuth});
    this.addRoute({path: '/auth', method: HttpMethod.Post, handler: this.requestAuth});
    this.addRoute({path: '/logout', method: HttpMethod.Delete, handler: this.logout});
    this.addRoute({path: '/:userId/avatar', method: HttpMethod.Put, handler: this.loadAvatar});
    this.addRoute({path: '/:userId/favorites/:offerId', method: HttpMethod.Put, handler:this.updateFavoriteStatus});
    this.addRoute({path: '/:userId/favorites/', method: HttpMethod.Get, handler:this.getFavorites});
  }

  public async register(req: Request, res: Response): Promise<void> {
    const {body} = req;

    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      const errorMessage = 'User with email already exists. Please enter another email.';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const newUser = await this.userService.create(body, this.configService.get('SALT'));
    // необходима доработка генерации токена и хранения в дб
    this.created(res, fillRDO(AuthUserRDO, {...newUser.toObject(), id: newUser._id, authToken: 'token'}));
  }

  public checkAuth(req: Request, res: Response): void {
    /*
    Будет доставаться токен из req Header, и проверяться с токеном в базе, будет добавлено позже
    */
    const reqToken = req.get('X-token');

    if (!reqToken) {
      const errorMessage = 'Request Error';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }
  }

  public async requestAuth(req: Request, res: Response): Promise<void> {
    const {body: {email, password}} = req;
    const existUser = await this.userService.findByEmail(email);

    if (!existUser) {
      const errorMessage = `User with email ${email} doesn't exist.`;
      this.send(res, StatusCodes.NOT_FOUND, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const encryptPassword = createSHA256(password, this.configService.get('SALT'));
    if (encryptPassword !== existUser.getPassword()) {
      const errorMessage = 'Wrong password';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    // необходима доработка генерации токена и хранения в дб
    const userResponse = fillRDO(AuthUserRDO, {...existUser.toObject(), id: existUser._id, authToken: 'token'});
    this.ok(res, userResponse);
  }

  public async loadAvatar(_req: Request, _res: Response): Promise<void> {
    throw new Error('Ещё не реализован');
  }

  public async logout(req: Request, res: Response): Promise<void> {
    const reqToken = req.get('X-token');
    /*
    Будет доставаться токен из req Header, и проверяться с токеном в базе, будет добавлено позже
    */
    if (!reqToken) {
      const errorMessage = 'Request Error. Ошибка завершения сеанса';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }
  }

  public async updateFavoriteStatus(req: Request, res: Response): Promise<void> {
    if(!Object.keys(req.params).includes('userId') ||
      !Object.keys(req.params).includes('offerId') ||
      !Object.keys(req.query).includes('isFav')) {
      const errorMessage = 'Incorrect path Error. Check your request';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    /*
    Блок с проверкой токена дописать
    */
    const {params: {userId, offerId}, query: {isFav}} = req;
    if (!userId || !offerId || !isFav) {
      const errorMessage = 'Incorrect path Error. Check your request';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const existOffer = await this.rentOfferService.findById(offerId);
    if (!existOffer) {
      const errorMessage = 'Offer with such id not found';
      this.send(res, StatusCodes.NOT_FOUND, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    //как лучше и где реализовать проверку и защиту от задвоения id оффера в массиве?

    const status = Number.parseInt(isFav.toString(), 10) === 1;
    const updateUser = await this.userService.changeFavoriteStatus(userId, existOffer.id, status);
    this.send(res, 201, updateUser);
  }

  public async getFavorites(req: Request, res: Response): Promise<void> {
    if(!Object.keys(req.params).includes('userId')) {
      const errorMessage = 'Incorrect path Error. Check your request';
      this.send(res, StatusCodes.BAD_REQUEST, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const {params: {userId}} = req;

    const existedUserFavorites = await this.userService.findUserFavorites(userId);
    const favoritesResponse = existedUserFavorites?.map((offer) => fillRDO(RentOfferBasicRDO, offer));
    this.ok(res, favoritesResponse);
  }
}

