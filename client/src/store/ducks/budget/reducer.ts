import { LoadingStatus } from '../../types';
import { BudgetActions } from './actionCreators';
import { BudgetActionsTypes } from './contracts/actionTypes';
import { BudgetState } from './contracts/state';

const initialState: BudgetState = {
  transactions: [],
  categories: [],
  loadingStatus: LoadingStatus.LOADING,
  error: { name: '', message: '' },
  date: {
    year: 2020,
    month: 10,
  },
  currentCategory: {
    _id: '',
    color: '',
    user: '',
    name: '',
    amount: 0,
    isExpense: true,
  },
  options: {
    startDate: '',
  },
  balance: [],
};

export const budgetReducer = (
  state = initialState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case BudgetActionsTypes.SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    case BudgetActionsTypes.SET_BUDGETDATA:
      return {
        ...state,
        transactions: action.payload.transactions,
        categories: action.payload.categories,
        currentCategory:
          action.payload.categories.length > 0
            ? action.payload.categories[0]
            : state.currentCategory,
        options: action.payload.options,
        balance: action.payload.balance,
      };
    case BudgetActionsTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case BudgetActionsTypes.ADD_TRANSACTION:
      const transaction = action.payload;
      const category = state.categories.find(
        item => item._id === transaction.category._id
      );

      const newTransaction = {
        ...transaction,
        category: {
          _id: category!._id,
          name: category!.name,
        },
      };
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
        currentCategory: category!,
      };
    case BudgetActionsTypes.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(item => item._id !== action.payload),
      };
    case BudgetActionsTypes.CHANGE_CATEGORY:
      const categories = state.categories.map(category => {
        if (category._id === action.payload._id) {
          return action.payload;
        }
        return category;
      });
      return {
        ...state,
        categories,
      };
    case BudgetActionsTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case BudgetActionsTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};
