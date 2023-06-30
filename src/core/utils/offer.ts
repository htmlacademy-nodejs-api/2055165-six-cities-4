import { CityName } from '../../types/city.type.js';
import type { Goods } from '../../types/goods.type.js';
import type { OfferType } from '../../types/offer-type.type.js';
import type { RentOffer } from '../../types/rent-offer.type.js';
import type { UserStatus } from '../../types/user-status.type.js';
import type { User } from '../../types/user.type.js';
import { getRandomNumber } from './randoms.js';

const RADIX = 10;

export function createOffer(offerData: string): RentOffer {
  const [
    title, description, offerDate, city,
    isPremium,
    rating, type, bedrooms, maxAdults,
    price, goods, username, email,
    userStatus
  ] = offerData.replace('\n', '').split('\t');


  const advertiser: User = {
    username,
    email,
    status: userStatus as UserStatus
  };

  const {latitude, longitude} = generateOfferLocation(city as CityName);

  return {
    title,
    description,
    offerDate: new Date(offerDate),
    city: city as CityName,
    previewImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
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


const CoordsRange = {
  Paris: {
    latitude: {
      min: 48.823413,
      max: 48.899293
    },
    longitude: {
      min: 2.282930,
      max: 2.403663
    }
  },

  Cologne: {
    latitude: {
      min: 50.916726,
      max: 50.986858
    },
    longitude: {
      min: 6.886408,
      max: 7.012258
    }
  },

  Brussels: {
    latitude: {
      min: 50.802021,
      max: 50.889017
    },
    longitude: {
      min: 4.302077,
      max: 4.420559
    }
  },

  Amsterdam: {
    latitude: {
      min: 52.341203,
      max: 52.422435
    },
    longitude: {
      min: 4.788972,
      max: 4.946889
    }
  },

  Hamburg: {
    latitude: {
      min: 53.518013,
      max: 53.586607
    },
    longitude: {
      min: 9.920475,
      max: 10.101841
    }
  },

  Dusseldorf: {
    latitude: {
      min: 51.176111,
      max: 51.268527
    },
    longitude: {
      min: 6.747162,
      max: 6.878681
    }
  }
};

const COORD_DIGITS_COUNT = 6;

export function generateOfferLocation(city: CityName){
  const latitude = getRandomNumber(CoordsRange[city].latitude.min, CoordsRange[city].latitude.max, COORD_DIGITS_COUNT);
  const longitude = getRandomNumber(CoordsRange[city].longitude.min, CoordsRange[city].longitude.max, COORD_DIGITS_COUNT);

  return {latitude, longitude};
}

