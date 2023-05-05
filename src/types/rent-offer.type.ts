import { City } from './city.type.js';
import { Good } from './goods.type.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.type.js';
import { User } from './user.type.js';

export type RentalOffer = {
  title: string,
  description: string,
  offerDate: string,
  city: City
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: OfferType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: Good[],
  advertiser: User
  location: Location,
}
