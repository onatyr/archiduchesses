import { InferSelectModel } from "drizzle-orm";
import { plants } from "../../database/schema";
import { PlantsWithTaskResult } from "../plants/plants.query";

export function formatPlantsWithTasks(plantsWithTask: PlantsWithTaskResult) {
    return plantsWithTask.reduce((acc, row) => {
        const plant = acc.find((p) => p.id === row.plants.id);

        if (plant) {
            if (row.tasks) {
                plant.tasks.push({
                    taskId: row.tasks.id,
                    dueDate: row.tasks.dueDate,
                });
            }
        } else {
            acc.push({
                ...row.plants,
                tasks: row.tasks
                    ? [
                        {
                            taskId: row.tasks.id,
                            dueDate: row.tasks.dueDate,
                        },
                    ]
                    : [],
            });
        }

        return acc;
    }, [] as Array<InferSelectModel<typeof plants> & {
        tasks: Array<{
            taskId: string;
            dueDate: string | null
        }>;
    }>);
}

export function computeDaysUntilNextWatering(minSoilMoist: number, maxSoilMoist: number, moistLossRateDay: number = 0.05) {
    const currentSoilMost = 0.8 * maxSoilMoist // need testing IRL to adjust
    return Math.log(minSoilMoist/currentSoilMost)/Math.log(1-moistLossRateDay)
}

const max = 70

function testCompute() {
    let current = max - (max * 0.05)
    let count = 0
    while (current>30) {
        current = current - (current * 0.05)
        count ++
    }
    return count
}
//
// console.log(computeDaysUntilNextWatering(30, max))
// console.log(testCompute())