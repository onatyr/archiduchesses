import { db } from '../../database/database';
import { plants } from '../../database/schema';
import { eq } from 'drizzle-orm';

export function getAllPlantsByUserId(userId: string) {
  return db.select().from(plants).where(eq(plants.userId, userId)).$dynamic();
}
