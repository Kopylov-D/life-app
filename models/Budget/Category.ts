import { Document, model, Schema, Types } from 'mongoose';
import { CategoryType } from '../../types/types';

const CategorySchema: Schema = new Schema<CategoryType>({
  name: {
    required: true,
    type: String,
    default: 'Новая категория',
  },
  user: {
    required: true,
    ref: 'User',
    type: Types.ObjectId,
  },
  color: {
    required: true,
    type: String,
    default: 'blue',
  },
  amount: {
    required: true,
    type: Number,
    default: 0,
  },
  isExpense: {
    required: true,
    type: Boolean,
    default: true,
  },
});

export type CategoryModelDocumentInterface = CategoryType & Document;

export const Category = model<CategoryModelDocumentInterface>('Category', CategorySchema);
