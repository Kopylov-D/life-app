import { ThunkAction } from 'redux-thunk';
import { budgetApi } from '../../../services/api/budgetApi';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import {
  addCategory,
  addTransaction,
  BudgetActions,
  changeCategory,
  deleteCategory,
  deleteTransaction,
  setBudgetData,
  setCategories,
  setLoadingStatus,
} from './actionCreators';
import { CategoryInterface, TransactionInterface } from './contracts/state';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, BudgetActions>;

export function getBudgetData(
  year?: string,
  month?: string,
  all: boolean = false,
  fullYear: boolean = false
): ThunkType {
  return async dispatch => {
    dispatch(setLoadingStatus(LoadingStatus.LOADING));
    try {
      if (!year) {
        year = new Date().getFullYear().toString();
      }
      if (!month) {
        month = new Date().getMonth().toString();
      }
      const { data } = await budgetApi.fetchBudgetData(year, month, all, fullYear);
      dispatch(setBudgetData(data));
      dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
      console.log(e);
      dispatch(setLoadingStatus(LoadingStatus.ERROR));
    }
  };
}

export function getCategories(): ThunkType {
  return async dispatch => {
    dispatch(setLoadingStatus(LoadingStatus.LOADING));
    try {
      const { data } = await budgetApi.fetchCategories();
      dispatch(setCategories(data));
      dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
      console.log(e);
      dispatch(setLoadingStatus(LoadingStatus.ERROR));
    }
  };
}

export function fetchAddTransaction(transaction: TransactionInterface): ThunkType {
  return async dispatch => {
    try {
      const { data } = await budgetApi.addTransaction(transaction);
      dispatch(addTransaction(data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchDeleteTransaction(_id: string): ThunkType {
  return async dispatch => {
    try {
      await budgetApi.deleteTransaction(_id);
      dispatch(deleteTransaction(_id));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchAddCategory(category: CategoryInterface): ThunkType {
  return async dispatch => {
    try {
      const { data } = await budgetApi.addCategory(category);
      dispatch(addCategory(data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateCategory(category: CategoryInterface): ThunkType {
  return async dispatch => {
    try {
      await budgetApi.changeCategory(category);
      dispatch(changeCategory(category));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchDeleteCategory(id: string): ThunkType {
  return async dispatch => {
    try {
      await budgetApi.deleteCategory(id);
      dispatch(deleteCategory(id));
    } catch (e) {}
  };
}
