import { Response } from 'express';
import { Target } from '../models/Todos/Target';
import { Task } from '../models/Todos/Task';
import { RequestWithUser, TaskInterface } from '../types/types';

class TodosController {
	async addTask(req: RequestWithUser, res: Response) {
		try {
			const { target, subtask, name, color, priority, date, expiresIn } = req.body;
			const task = new Task({
				user: req.user,
				target: target && target,
				subtask: subtask && subtask,
				name,
				color: color && color,
				priority: priority && priority,
				date: date && date,
				expiresIn: expiresIn && expiresIn,
			});

			await task.save();

			res.status(201).json({ message: 'task create', task });
		} catch (e) {
			res.status(300).json({ message: e });
		}
	}

	async addTarget(req: RequestWithUser, res: Response) {
		try {
			const {
				name,
				isDone,
				color,
				priority,
				date,
				expiresIn,
				notes,
			} = req.body;

			const target = new Target({
				user: req.user,
				name,
				isDone: isDone && isDone,
				color: color && color,
				priority: priority && priority,
				date: date && date,
				notes: notes && notes,
				expiresIn: expiresIn && expiresIn,
			});

			await target.save() 
			res.status(201).json({message: 'target added', target})
		} catch (e) {
			res.status(500).json({ message: e });
		}
	}

	async getTargets(req: RequestWithUser, res: Response) {
		try {
			const targets = await Target.find({user: req.user})
			res.status(200).json(targets)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getTasks(req: RequestWithUser, res: Response) {
		try {
			const tasks = await Task.find({user: req.user})
			res.status(200).json(tasks)
			
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new TodosController();
