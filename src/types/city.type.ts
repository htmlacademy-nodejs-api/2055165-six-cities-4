export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const Cities = {
  Paris: {
    latitude: 48.85661,
    longitude:  2.351499
  },

  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974
  },

  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697
  },

  Amsterdam: {
    latitude: 52.370216,
    longitude: 4.895168
  },

  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654
  },

  Dusseldorf: {
    latitude: 53.550341,
    longitude: 10.000654
  },
} as const;

export type City = {
  name: string;
  latitude: number;
  longitude: number;
}
