import express from "express";
import { getAllTasksWithPlant } from "./tasks.query";

export const tasksController: express.Router = express();

tasksController.get('/all', async (req, res, next) => {
    try {
        const allTasks = await getAllTasksWithPlant(req.userId)
        res.status(200).json(allTasks)
    }
    catch (e) {
        console.error(e instanceof Error ? e.message : e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})