import { Document, model, Schema, Types } from 'mongoose';
import { TransactionType } from '../../types/types';

const TransactionSchema: Schema = new Schema<TransactionType>({
	user: {
		required: true,
		ref: 'User',
		type: Types.ObjectId,
	},
	amount: {
		required: true,
		type: Number,
		max: 999999999,
	},
	date: {
		required: true,
		type: Date,
		default: Date.now,
	},
});

export type TransactionModelDocumentInterface = TransactionType & Document;

export const Transaction = model<TransactionModelDocumentInterface>(
	'Transaction',
	TransactionSchema
);
