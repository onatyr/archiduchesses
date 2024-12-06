import { db } from '../../database/database';
import { plants, tasks } from '../../database/schema';
import { and, eq } from 'drizzle-orm';

export function getAllPlantsByUserId(userId: string) {
  return db.select()
      .from(plants)
      .where(eq(plants.userId, userId))
      .$dynamic();
}

export type PlantsWithTaskResult = Awaited<ReturnType<typeof getAllPlantsWithTask>>
export async function getAllPlantsWithTask(userId: string) {
  return getAllPlantsByUserId(userId)
      .leftJoin(tasks, and(
          eq(tasks.plantId, plants.id),
          eq(tasks.done, false))
      )
      .$dynamic()
}