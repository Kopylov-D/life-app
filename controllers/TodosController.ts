import { Response } from 'express';
import { Types } from 'mongoose';
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
import extractColorId from '../utils/exctractColorId';

class TodosController {
  async syncTodos(req: RequestWithUser, res: Response) {
    try {
      if (req.body.tasks) {
        const tasks: TaskInterface[] = req.body.tasks;
        tasks.forEach(async task => {
          await Task.findByIdAndUpdate(task._id, { $set: task });
        });
      }

      if (req.body.targets) {
        const targets: TargetInterface[] = req.body.targets;
        targets.forEach(async target => {
          await Target.findByIdAndUpdate(target._id, { $set: target });
        });
      }

      if (req.body.subtasks) {
        const subtasks: SubtaskInterface[] = req.body.subtasks;
        subtasks.forEach(async subtask => {
          await Subtask.findByIdAndUpdate(subtask._id, { $set: subtask });
        });
      }

      if (req.body.cards) {
        const cards: CardInterface[] = req.body.cards;
        cards.forEach(async card => {
          await Card.findByIdAndUpdate(card._id, { $set: card });
        });
      }

      res.status(201).json({ message: 'Синхронизация завершена' });
    } catch (e) {
      res.status(300).json({ message: e });
    }
  }

  async addTask(req: RequestWithUser, res: Response) {
    try {
      const color = extractColorId(req.body);
      const task = new Task({
        ...req.body,
        _id: Types.ObjectId(),
        user: req.user,
        color,
      });
      await task.save();
      res.status(201).json({ message: 'task create', data: task });
    } catch (e) {
      res.status(300).json({ message: e });
    }
  }

  async deleteTask(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'target is deleted' });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }

  async multiplyDelete(req: RequestWithUser, res: Response) {
    try {
      if (req.body.tasksId) {
        const tasksId: string[] = req.body.tasksId;
        tasksId.forEach(async taskId => {
          await Task.findByIdAndDelete(taskId);
        });
      }
      if (req.body.subtasksId) {
        const subtasksId: string[] = req.body.subtasksId;
        subtasksId.forEach(async subtaskId => {
          await Subtask.findByIdAndDelete(subtaskId);
        });
      }

      res.status(200).json({ message: 'Удаление завершено' });
    } catch (e) {
      res.status(500).json({ message: e });
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
      res.status(201).json({ message: 'Цель создана', data: target });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }

  async updateTarget(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      const updatedTarget = await Target.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      res.status(201).json({ message: 'Цель обновлена', data: updatedTarget });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }

  async deleteTarget(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      await Target.findByIdAndDelete(id);
      res.status(200).json({ message: 'Цель удалена' });
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
      res.status(201).json({ message: 'Карточка добавлена', data: card });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }

  async addSubtask(req: RequestWithUser, res: Response) {
    try {
      const subtask = new Subtask({ ...req.body, _id: Types.ObjectId(), user: req.user });
      await subtask.save();
      res.status(201).json({ message: 'Подзадача добавлена', data: subtask });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }

  async deleteSubtask(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      await Subtask.findByIdAndDelete(id);
      res.status(200).json({ message: 'Подзадача удалена' });
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
      const { id } = req.params;

      const updatedCard = await Card.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({ message: 'Карточка изменена', data: updatedCard });
    } catch (e) {
      res.status(300).json({ message: e });
    }
  }

  async deleteCard(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      await Card.findByIdAndDelete(id);
      res.status(200).json({ message: 'Карточка удалена' });
    } catch (e) {
      res.status(300).json({ message: e });
    }
  }

  async updateTask(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;

      Task.schema.path('level').validate(function (value: string | null) {
        return value !== null && value !== '';
      }, 'Invalid value');

      const updatedTask = await Task.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({ message: 'Задача обновлена', data: updatedTask });
    } catch (e) {
      res.status(300).json({ message: e });
    }
  }
}

export default new TodosController();
