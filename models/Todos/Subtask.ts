import { Document, model, Schema, Types } from 'mongoose';
import { SubtaskInterface } from '../../types/types';

const SubtaskSchema: Schema = new Schema<SubtaskInterface>({
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
	task: {
		required: true,
		ref: 'Task',
		type: Types.ObjectId,
	},
	name: {
		required: true,
		type: String,
		default: 'Новая подзадача',
	},
	isDone: {
		required: true,
		type: Boolean,
		default: false,
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

type SubtaskModelDocumentInterface = SubtaskInterface & Document;

export const Subtask = model<SubtaskModelDocumentInterface>('Subtask', SubtaskSchema);
