import { Task } from "@shared/models/task.model";

export type Plant = {
  id: string
  userId: string
  name: string
  sunlight: Sunlight
  watering: Watering
  adoptionDate: string
  placeId: string | undefined
  imageUrl: string
  tasks?: Task[] | undefined
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

export type PlantBookSearchResult = {
  displayPid: string
  pid: string
}

export type PlantBookDetails = PlantBookSearchResult & {
  maxLightLux: number
  minLightLux: number
  maxSoilMoist: number
  minSoilMoist: number
  imageUrl: string
}

export type PlantNetIdentification = {
  plantnetName: string
  plantnetGenus: string
  score: number
  plantbookDetails?: PlantBookDetails | null | undefined
}
