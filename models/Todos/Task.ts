import { Document, model, Schema, Types } from 'mongoose';
import { TaskInterface } from '../../types/types';

const TaskSchema: Schema = new Schema<TaskInterface>({
	user: {
		required: true,
		ref: 'User',
		type: Types.ObjectId,
	},
	target: {
		required: false,
		ref: 'Target',
		type: Types.ObjectId,
	},
	subtask: {
		required: false,
		ref: 'Subtask',
		type: Types.ObjectId,
	},
	name: {
		required: true,
		type: String,
		default: 'Новая задача',
	},
	color: {
		required: false,
		ref: 'Color',
		type: Types.ObjectId,
	},
	priority: {
		required: false,
		type: Number,
	},
	date: {
		required: true,
		type: Date,
		default: Date.now,
	},
	level: {
		required: true,
		type: Number,
		default: 0,
	},
	expiresIn: {
		required: false,
		type: Date,
	},
});

type TaskModelDocumentInterface = TaskInterface & Document;

export const Task = model<TaskModelDocumentInterface>('Task', TaskSchema);
