import { model, Schema, Document, Types } from 'mongoose';
import { UserType } from '../types/types';


const UserSchema: Schema = new Schema<UserType>({
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

export type UserModelDocumentInterface = UserType & Document

export const User = model<UserModelDocumentInterface>('User', UserSchema);

