import { Document, model, Schema, Types } from 'mongoose';
import { ColorInterface } from '../../types/types';

const ColorSchema: Schema = new Schema<ColorInterface>({
	name: {
		required: true,
		type: String,
	},
	hex: {
		required: true,
		type: String,
	},
});

type ColorModelDocumentInterface = ColorInterface & Document;

export const Color = model<ColorModelDocumentInterface>('Color', ColorSchema);
