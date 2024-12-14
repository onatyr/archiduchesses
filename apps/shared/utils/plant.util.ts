import { Sunlight } from "@shared/models";

export function getSunlightExposure(lux: number): Sunlight {
  if (lux >= 50000) {
    return Sunlight.FullSun;
  } else if (lux >= 15000) {
    return Sunlight.BrightIndirectLight;
  } else if (lux >= 3000) {
    return Sunlight.PartialShade;
  } else {
    return Sunlight.LowLight;
  }
}

// const getWateringSchedule = (soilMoisture: number): Watering => {
//  if (soilMoisture >= 60) {
//   return Watering.Frequent;
//  } else if (soilMoisture >= 40) {
//   return Watering.Moderate;
//  } else if (soilMoisture >= 20) {
//   return Watering.Sparing;
//  } else {
//   return Watering.Minimal;
//  }
// };