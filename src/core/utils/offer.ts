import { CityName } from '../../types/city.type.js';
import type { Goods } from '../../types/goods.type.js';
import type { OfferType } from '../../types/offer-type.type.js';
import type { RentOffer } from '../../types/rent-offer.type.js';
import type { UserStatus } from '../../types/user-status.type.js';
import type { User } from '../../types/user.type.js';
import { generateRandomLocation } from './randoms.js';

const RADIX = 10;

export function createOffer(offerData: string): RentOffer {
  const [
    title, description, offerDate, city,
    isPremium, previewImage, images,
    rating, type, bedrooms, maxAdults,
    price, goods, username, email,
    userStatus
  ] = offerData.replace('\n', '').split('\t');


  const advertiser: User = {
    username,
    email,
    status: userStatus as UserStatus
  };

  const {latitude, longitude} = generateRandomLocation(city as CityName);

  return {
    title,
    description,
    offerDate: new Date(offerDate),
    city: city as CityName,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    rating: Number.parseFloat(rating),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, RADIX),
    maxAdults: Number.parseInt(maxAdults, RADIX),
    price: Number.parseInt(price, RADIX),
    goods: goods.split(';') as Goods[],
    advertiser,
    latitude: latitude,
    longitude: longitude
  };
}
