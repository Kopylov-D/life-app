import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { BudgetDataInterface, CategoryInterface, TransactionInterface } from './state';

export enum BudgetActionsTypes {
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
  SET_BUDGETDATA = 'SET_BUDGETDATA',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',
  ADD_CATEGORY = 'ADD_CATEGORY',
  CHANGE_CATEGORY = 'CHANGE_CATEGORY',
  SET_CATEGORIES = 'SET_CATEGORIES',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
}

export interface SetLoadingStatusActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.SET_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetBudgetDataActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.SET_BUDGETDATA;
  payload: BudgetDataInterface;
}

export interface AddTransactionActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.ADD_TRANSACTION;
  payload: TransactionInterface;
}

export interface DeleteTransactionActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.DELETE_TRANSACTION;
  payload: string;
}

export interface DeleteCategoryActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.DELETE_CATEGORY;
  payload: string;
}

export interface AddCategoryActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.ADD_CATEGORY;
  payload: CategoryInterface;
}

export interface ChangeCategoryActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.CHANGE_CATEGORY;
  payload: CategoryInterface;
}

export interface SetCategoriesActionInterface extends Action<BudgetActionsTypes> {
  type: BudgetActionsTypes.SET_CATEGORIES;
  payload: CategoryInterface[];
}
