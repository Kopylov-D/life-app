import { model, Schema, Document, Types } from 'mongoose';

export interface UserModelInterface {
	_id?: string;
	email: string;
	password: string;
}

const UserSchema: Schema = new Schema<UserModelInterface>({
  // _id: Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// UserSchema.set('toJSON', {
//   transform: function (_, obj) {
//     delete obj.password;
//     delete obj.confirmHash;
//     return obj;
//   },
// });

export type UserModelDocumentInterface = UserModelInterface & Document

export const User = model<UserModelDocumentInterface>('User', UserSchema);

