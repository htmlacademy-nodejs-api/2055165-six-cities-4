export const AppComponent = {
  CLIApplication: Symbol.for('CLIApplication'),
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  RentOfferServiceInterface: Symbol.for('RentOfferServiceInterface'),
  RentOfferModel: Symbol.for('RentOfferModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  UserController: Symbol.for('UserController'),
  RentOfferController: Symbol.for('RentOfferController'),
  CommentController: Symbol.for('CommentController'),
  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),
  DefaultExceptionFilter: Symbol.for('DefaultExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  AuthorizationExceptionFilter: Symbol.for('AuthorizationExceptionFilter')
} as const;

