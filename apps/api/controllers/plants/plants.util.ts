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
      dueDate: Date | null
    }>;
  }>);
}