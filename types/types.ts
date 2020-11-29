import { Request } from 'express';

export type UserType = {
	_id?: string;
	email: string;
	password: string;
};

export interface RequestWithUser extends Request {
	user?: string;
}

export type TransactionType = {
	_id?: string;
	user: string;
	amount: number;
	date: Date;
	// category: CategoryType;
	category: string
};

export type CategoryType = {
	_id: string;
	name: string;
	user: string
	color: string;
	amount: number

};
