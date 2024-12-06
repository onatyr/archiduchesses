import {plants, tasks, taskTypeEnum} from "../../database/schema";
import { and, eq } from "drizzle-orm";
import { getAllPlantsByUserId } from "../plants/plants.query";
import { db } from "../../database/database";

export async function getAllTasksWithPlant(userId: string) {
    return getAllPlantsByUserId(userId)
        .rightJoin(tasks, and(
            eq(tasks.plantId, plants.id),
            eq(tasks.done, false))
        )
        .$dynamic()
}

export async function insertTask(plantId: string, dueDate: string) {
    return db.insert(tasks).values({
        plantId: plantId,
        type: 'watering',
        dueDate: dueDate
    })
}