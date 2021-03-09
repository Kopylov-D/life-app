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
  category: string;
  isExpense: boolean;
};

export type CategoryType = {
  _id: string;
  name: string;
  user: string;
  color: string;
  amount: number;
  isExpense: boolean;
};

export type BalanceType = {
  _id: string;
  user: string;
  date: Date;
  value: number;
};

export type FiltredDateType = {
  $gte: Date;
  $lt: Date;
};

export enum Priority {
  none = 0,
  high = 1,
  middle = 2,
  low = 3,
}

export interface TaskInterface {
  _id: string;
  user: string;
  target?: string;
  subtask?: string;
  name: string;
  isDone: boolean;
  notes: string;
  color?: string;
  priority?: Priority;
  date: Date;
  level: number;
  expiresIn?: Date;
}

export interface SubtaskInterface {
  _id: string;
  user: string;
  target?: string;
  task: string;
  name: string;
  isDone: boolean;
  color?: string;
  priority?: Priority;
  date: Date;
  level: number;
  expiresIn?: Date;
}

export interface ColorInterface {
  _id: string;
  name: string;
  hex: string;
}

export interface TargetInterface {
  _id: string;
  user: string;
  name: string;
  isDone: boolean;
  notes: string;
  priority?: Priority;
  date: Date;
  color?: string;
  expiresIn?: Date;
}

export interface CardInterface {
  _id: string;
  user: string;
  name: string;
  color?: string;
  level: number;
}
