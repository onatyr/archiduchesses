import { plants, tasks, taskTypeEnum } from "@api/database/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@api/database/database";
import { getAllPlantsByUserId } from "@api/controllers/plants/plants.query";

export async function getAllTasksWithPlant(userId: string) {
  return getAllPlantsByUserId(userId)
   .rightJoin(tasks, and(
    eq(tasks.plantId, plants.id),
    eq(tasks.done, false))
   )
   .$dynamic()
}

export async function insertWateringTask(plantId: string, dueDate: Date) {
  return db.insert(tasks).values({
    plantId: plantId,
    type: 'watering',
    dueDate: new Date(dueDate.toISOString().split('T')[0])
  }).returning({id: tasks.id});
}