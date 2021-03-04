import { Document, model, Schema, Types } from 'mongoose';
import { TargetInterface } from '../../types/types';

const TargetSchema: Schema = new Schema<TargetInterface>({
	user: {
		required: true,
		ref: 'User',
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
	notes: {
		required: false,
		type: String,
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
	expiresIn: {
		required: false,
		type: Date,
	},
});

export type TargetModelDocumentInterface = TargetInterface & Document;

export const Target = model<TargetModelDocumentInterface>('Target', TargetSchema);
