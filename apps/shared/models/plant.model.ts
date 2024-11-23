export type Plant = {
  id: string;
  userId: string;
  name: string;
  sunlight: Sunlight;
  watering: Watering;
  adoptionDate: string;
  placeId: string | undefined;
  imageUrl: string;
};

/* eslint-disable no-unused-vars */
export enum Sunlight {
  FullSun = 'Full Sun',
  BrightIndirectLight = 'Bright Indirect Light',
  PartialShade = 'Partial Shade',
  LowLight = 'Low Light',
}

/* eslint-disable no-unused-vars */
export enum Watering {
  Frequent = 'Frequent',
  Moderate = 'Moderate',
  Sparing = 'Sparing',
  Minimal = 'Minimal',
}

export type PlantBookEntity = {
  name: string,
  pid: string
}

export type PlantBookDetails = {
  'pid': string
  'display_pid': string
  'max_light_lux': number
  'min_light_lux': number
  'max_soil_moist': number
  'min_soil_moist': number
  'image_url': string
}

export type PlantNetIdentification = {
  plantnetName: string,
  plantnetGenus: string,
  score: number,
  plantbookDetails?: PlantBookDetails | null | undefined,
}
