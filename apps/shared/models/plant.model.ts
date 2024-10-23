export type Plant = {
  id: string;
  userId: string;
  name: string;
  family: PlantFamily;
  sunlight: PlantSunlight;
  watering: PlantWatering;
  adoptionDate: string;
  placeId: string | undefined;
  imageUrl: string;
};

export enum PlantSunlight {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum PlantWatering {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum PlantFamily {
  FloweringPlants = 'Flowering Plants',
  FoliagePlants = 'Foliage Plants',
  SucculentsAndCacti = 'Succulents & Cacti',
  EdiblePlants = 'Edible Plants',
  TreesAndShrubs = 'Trees & Shrubs',
  ClimbersAndVines = 'Climbers & Vines',
  AquaticPlants = 'Aquatic Plants',
  CarnivorousPlants = 'Carnivorous Plants',
  Palms = 'Palms',
  BulbousPlants = 'Bulbous Plants',
}
