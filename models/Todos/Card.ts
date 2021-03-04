import { Document, model, Schema, Types } from 'mongoose';
import { CardInterface } from '../../types/types';

const CardSchema: Schema = new Schema<CardInterface>({
	user: {
		required: true,
		ref: 'User',
		type: Types.ObjectId,
	},
	name: {
		required: true,
		type: String,
		default: 'Новая карточка',
	},
	color: {
		required: false,
		ref: 'Color',
		type: Types.ObjectId,
	},
	level: {
		required: true,
		type: Number,
		default: 0,
	},
});

type CardModelDocumentInterface = CardInterface & Document;

export const Card = model<CardModelDocumentInterface>('Card', CardSchema);
