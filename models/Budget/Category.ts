import { Document, model, Schema } from 'mongoose';
import { CategoryType } from '../../types/types';

const CategorySchema: Schema = new Schema<CategoryType>({
	name: {
		required: true,
		type: String,
	},
	color: {
		type: String,
	},
});

export type CategoryModelDocumentInterface = CategoryType & Document;

export const Category = model<CategoryModelDocumentInterface>(
	'Category',
	CategorySchema
);
