import { Response } from 'express';
import { Task } from '../models/Todos/Task';
import { RequestWithUser, TaskInterface } from '../types/types';

class TodosController {
	async addTask(req: RequestWithUser, res: Response) {
		try {
			const { target, subtask, name, color, priority, date } = req.body;
			const task = new Task({
				user: req.user,
				target: target && target,
				subtask: subtask && subtask,
				name,
				color: color && color,
				priority: priority && priority,
				date: date && date,
			});

			await task.save();

			res.status(201).json({ message: 'task create', task });
		} catch (e) {
			res.status(300).json({ message: e });
		}
	}
}

export default new TodosController();
