import { Response } from 'express';
import { Card } from '../models/Todos/Card';
import { Color } from '../models/Todos/Color';
import { Subtask } from '../models/Todos/Subtask';
import { Target } from '../models/Todos/Target';
import { Task } from '../models/Todos/Task';
import {
	CardInterface,
	RequestWithUser,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
} from '../types/types';

class TodosController {
	async addTask(req: RequestWithUser, res: Response) {
		try {
			const {
				target,
				subtask,
				name,
				color,
				priority,
				date,
				expiresIn,
				level,
				notes,
				isDone,
			}: TaskInterface = req.body;
			const task = new Task({
				user: req.user,
				target: target && target,
				subtask: subtask && subtask,
				name,
				isDone: isDone && isDone,
				level: level && level,
				notes: notes && notes,
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
			}: TargetInterface = req.body;

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

			await target.save();
			res.status(201).json({ message: 'target added', data: target });
		} catch (e) {
			res.status(500).json({ message: e });
		}
	}

	async addCard(req: RequestWithUser, res: Response) {
		try {
			const { name, level, color }: CardInterface = req.body;

			const card = new Card({
				user: req.user,
				name: name && name,
				level,
				color: color && color,
			});

			await card.save();
			res.status(201).json({ message: 'card added', data: card });
		} catch (e) {
			res.status(500).json({ message: e });
		}
	}

	async addSubtask(req: RequestWithUser, res: Response) {
		try {
			const {
				name,
				isDone,
				color,
				priority,
				date,
				expiresIn,
				level,
				task,
				target,
			}: SubtaskInterface = req.body;

			const subtask = new Subtask({
				user: req.user,
				name,
				isDone: isDone && isDone,
				color: color && color,
				priority: priority && priority,
				date: date && date,
				level,
				task,
				target: target && target,
				// notes: notes && notes,
				expiresIn: expiresIn && expiresIn,
			});

			await subtask.save();
			res.status(201).json({ message: 'subtask added', data: subtask });
		} catch (e) {
			res.status(500).json({ message: e });
		}
	}

	async getTargets(req: RequestWithUser, res: Response) {
		try {
			const targets = await Target.find({ user: req.user });
			res.status(200).json(targets);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async getTasks(req: RequestWithUser, res: Response) {
		try {
			const tasks = await Task.find({ user: req.user });
			res.status(200).json({ message: '', data: tasks });
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async getTodosData(req: RequestWithUser, res: Response) {
		try {
			const tasks = await Task.find({ user: req.user });
			const targets = await Target.find({ user: req.user });
			const subtasks = await Subtask.find({ user: req.user });
			const cards = await Card.find({ user: req.user });
			const colors = await Color.find();

			res
				.status(200)
				.json({ message: '', data: { tasks, targets, subtasks, cards, colors } });
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async updateCard(req: RequestWithUser, res: Response) {
		try {
			const { name, color, level }: CardInterface = req.body;

			const card = {
				// user: req.user,
				name,
				level: level && level,
				color: color && color,
			};

			const { id } = req.params;

			await Card.findOneAndUpdate({ id }, { $set: card });

			const ncard = await Card.find({ id });

			res.status(200).json({ message: 'card is updated', data: ncard });
		} catch (e) {
			res.status(300).json({ message: e });
		}
	}
	async updateTask(req: RequestWithUser, res: Response) {
		try {
			const {
				_id,
				target,
				subtask,
				name,
				color,
				priority,
				date,
				expiresIn,
				level,
				notes,
				isDone,
			}: TaskInterface = req.body;

			const task = {
				user: req.user,
				target: target && target,
				subtask: subtask && subtask,
				name,
				isDone,
				level: level && level,
				notes: notes && notes,
				color: color && color,
				priority: priority && priority,
				date,
				expiresIn: expiresIn && expiresIn,
			};

			await Task.updateOne({ _id }, { $set: task });

			res.status(200).json({ message: 'task is updated' });
		} catch (e) {
			res.status(300).json({ message: e });
		}
	}
}

export default new TodosController();
