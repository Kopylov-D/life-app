import { LoadingStatus } from '../../types';
import {
  AddCategoryActionInterface,
  AddTransactionActionInterface,
  BudgetActionsTypes,
  DeleteCategoryActionInterface,
  DeleteTransactionActionInterface,
  SetBudgetDataActionInterface,
  SetLoadingStatusActionInterface,
  ChangeCategoryActionInterface,
  SetCategoriesActionInterface,
} from './contracts/actionTypes';
import {
  BudgetDataInterface,
  CategoryInterface,
  TransactionInterface,
} from './contracts/state';

export type BudgetActions =
  | SetLoadingStatusActionInterface
  | SetBudgetDataActionInterface
  | AddTransactionActionInterface
  | DeleteTransactionActionInterface
  | DeleteCategoryActionInterface
  | AddCategoryActionInterface
  | ChangeCategoryActionInterface
  | SetCategoriesActionInterface;

export const setLoadingStatus = (
  payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
  type: BudgetActionsTypes.SET_LOADING_STATUS,
  payload,
});
export const setBudgetData = (
  payload: BudgetDataInterface
): SetBudgetDataActionInterface => ({
  type: BudgetActionsTypes.SET_BUDGETDATA,
  payload,
});
export const addTransaction = (
  payload: TransactionInterface
): AddTransactionActionInterface => ({
  type: BudgetActionsTypes.ADD_TRANSACTION,
  payload,
});
export const deleteTransaction = (payload: string): DeleteTransactionActionInterface => ({
  type: BudgetActionsTypes.DELETE_TRANSACTION,
  payload,
});
export const deleteCategory = (payload: string): DeleteCategoryActionInterface => ({
  type: BudgetActionsTypes.DELETE_CATEGORY,
  payload,
});

export const addCategory = (payload: CategoryInterface): AddCategoryActionInterface => ({
  type: BudgetActionsTypes.ADD_CATEGORY,
  payload,
});
export const changeCategory = (
  payload: CategoryInterface
): ChangeCategoryActionInterface => ({
  type: BudgetActionsTypes.CHANGE_CATEGORY,
  payload,
});
export const setCategories = (
  payload: CategoryInterface[]
): SetCategoriesActionInterface => ({
  type: BudgetActionsTypes.SET_CATEGORIES,
  payload,
});
