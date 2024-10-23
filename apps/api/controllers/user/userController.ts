import express from 'express';
import { db } from '../../database/database';
import { places, users } from '../../database/schema';
import { eq } from 'drizzle-orm';

export const userController: express.Router = express();

userController.get('/rooms', async (req, res) => {
  const userRooms = await db
    .select()
    .from(places)
    .where(eq(places.userId, req.userId))
    .execute();
  res.status(200).json(userRooms);
});

userController.get('/name', async (req, res) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, req.userId))
    .limit(1)
    .execute();
  res.status(200).json(user[0].name);
});
