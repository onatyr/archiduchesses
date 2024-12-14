import { Task } from "@shared/models/task.model";

export type Plant = PlantBase & {
  id: string
  userId: string
  tasks?: Task[] | undefined
};

export type PlantBase = {
  name: string
  adoptionDate: Date
  sunlight: Sunlight | undefined
  wateringRecurrenceDays: number | undefined
  roomId: string | undefined
  imageUrl: string | undefined
}

export enum Sunlight {
  LowLight = 'Low Light',
  PartialShade = 'Partial Shade',
  BrightIndirectLight = 'Bright Indirect Light',
  FullSun = 'Full Sun',
}

export type PlantBookSearchResult = {
  displayPid: string
  pid: string
}

export type PlantBookDetails = PlantBookSearchResult & {
  maxLightLux: number
  minLightLux: number
  imageUrl: string
}

export type PlantNetIdentification = {
  plantnetName: string
  plantnetGenus: string
  score: number
  plantbookDetails?: PlantBookDetails | null | undefined
}
