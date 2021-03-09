import { CurrentDate } from '../../../../types';
import { LoadingStatus } from '../../../types';

export type BudgetState = {
  transactions: TransactionInterface[];
  categories: CategoryInterface[];
  loadingStatus: LoadingStatus;
  error: Error;
  date: CurrentDate;
  currentCategory: CategoryInterface;
  options: OptionsInterface;
  balance: BalanceInterface[];
};

export type OptionsInterface = {
  startDate: string;
};

export interface BudgetDataInterface {
  transactions: TransactionInterface[];
  categories: CategoryInterface[];
  options: OptionsInterface;
  balance: BalanceInterface[];
}
export interface TransactionInterface {
  _id: string;
  category: {
    _id: string;
    name: string;
  };
  user: string;
  amount: number;
  isExpense: boolean;
  date: Date;
}

export interface CategoryInterface {
  _id: string;
  user: string;
  name: string;
  amount: number;
  color: string;
  isExpense: boolean;
}

export interface BalanceInterface {
  _id: string;
  date: string;
  user: string;
  value: number;
}
