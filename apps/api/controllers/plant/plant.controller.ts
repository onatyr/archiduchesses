import express from 'express';
import { db } from '../../database/database';
import { plants } from '../../database/schema';
import { Plant } from '@shared/models/plant.model';
import { getAllPlantsByUserId } from './plant.query';
import upload from '../../lib/cloudinary/upload';

export const plantController: express.Router = express();

plantController.get('/all', async (req, res) => {
  const allPlants = await getAllPlantsByUserId(req.userId).execute();
  res.status(200).json(allPlants);
});

plantController.post(
  '/new',
  upload.single('file'),
  async (req: express.Request<unknown, unknown, Plant>, res) => {
    const plant = await db.insert(plants).values({
      userId: req.userId,
      name: req.body.name,
      family: req.body.family,
      sunlight: req.body.sunlight,
      watering: req.body.watering,
      adoptionDate: req.body.adoptionDate,
      imageUrl: req.file?.path,
    });

    if (!plant) return res.status(500).json();

    res.status(201).json();
  }
);
