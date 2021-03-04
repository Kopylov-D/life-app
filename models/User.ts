import { model, Schema, Document } from 'mongoose';
import { UserType } from '../types/types';

const UserSchema: Schema = new Schema<UserType>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	balance: {
		type: Array,
	},
});

export type UserModelDocumentInterface = UserType & Document;

export const User = model<UserModelDocumentInterface>('User', UserSchema);
