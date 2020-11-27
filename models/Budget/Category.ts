import { Document, model, Schema, Types } from 'mongoose';
import { CategoryType } from '../../types/types';

const CategorySchema: Schema = new Schema<CategoryType>({
	// _id: {
	// 	required: true,
	// 	type: Types.ObjectId
	// },
	name: {
		required: true,
		type: String,
	},
	color: {
		type: String,
	},
	transactions: {
		type: Array
	}
});

export type CategoryModelDocumentInterface = CategoryType & Document;

export const Category = model<CategoryModelDocumentInterface>(
	'Category',
	CategorySchema
);
