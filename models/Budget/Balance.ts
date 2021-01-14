import { Document, model, Schema, Types } from 'mongoose';
import { BalanceType } from '../../types/types';

const BalanceSchema: Schema = new Schema<BalanceType>({
	user: {
		required: true,
		ref: 'User',
		type: Types.ObjectId,
	},
	transaction: {
		required: true,
		ref: 'Transaction',
		type: Types.ObjectId,
	},
	date: {
		required: true,
		type: Date,
		default: Date.now,
	},
	value: {
		required: true,
		type: Number,
	},
});

export type BalanceModelDocumentInterface = BalanceType & Document;

export const Balance = model<BalanceModelDocumentInterface>(
	'Balance',
	BalanceSchema
);
