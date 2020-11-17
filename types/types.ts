import { Request } from 'express';

export type UserType = {
	_id?: string;
	email: string;
	password: string;
};

export interface RequestWithUser extends Request {
	user?: string;
}
