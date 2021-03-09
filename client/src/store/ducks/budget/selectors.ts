import { createSelector } from 'reselect';
import { formatDate } from '../../../services/utils/dateUtils';
import { RootState } from '../../rootReducer';
import {
  BalanceChartInterface,
  ColumnsChartInterface,
  LoadingStatus,
  SelectCategoriesWithAmount,
} from '../../types';
import {
  BalanceInterface,
  CategoryInterface,
  OptionsInterface,
  TransactionInterface,
} from './contracts/state';

export const selectTransactions = (state: RootState): TransactionInterface[] =>
  state.budget.transactions;
export const selectCategories = (state: RootState): CategoryInterface[] =>
  state.budget.categories;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  state.budget.loadingStatus;

export const selectCurrentCategory = (state: RootState) => state.budget.currentCategory;

export const selectOptions = (state: RootState): OptionsInterface => state.budget.options;

export const selectBalance = (state: RootState): BalanceInterface[] => {
  return state.budget.balance;
};

export const selectBalanceWithFormatDate = createSelector(selectBalance, balance => {
  return balance.map(item => {
    item.date = formatDate(item.date);
    return item;
  });
});

export const selectCategoriesWithAmount = createSelector(
  selectTransactions,
  selectCategories,
  (
    transactions: TransactionInterface[],
    categories: CategoryInterface[]
  ): SelectCategoriesWithAmount => {
    let expense = 0;
    let income = 0;

    const categoriesWithAmount = categories.map((category: CategoryInterface) => {
      category.amount = 0;
      transactions.forEach((transaction: TransactionInterface) => {
        if (transaction.category._id === category._id) {
          const value = transaction.amount;
          category.amount += value;
          category.isExpense ? (expense += value) : (income += value);
        }
      });
      return category;
    });

    const percentIncome = (income * 100) / (expense + income);
    const percentExpense = 100 - percentIncome;

    return {
      categories: categoriesWithAmount,
      proportion: {
        income,
        expense,
        percentIncome: percentIncome ? percentIncome : 0,
        percentExpense: percentExpense ? percentExpense : 0,
      },
    };
  }
);

export const selectDataChart = createSelector(
  selectTransactions,
  (transactions: TransactionInterface[]): BalanceChartInterface[] => {
    const result: BalanceChartInterface[] = [];

    let sum = 0;
    let name = '';
    let balance = 0;

    transactions.forEach((transaction, index) => {
      if (index === 0) {
        sum = transaction.amount;
        name = formatDate(transaction.date);
      } else {
        if (formatDate(transaction.date) === formatDate(transactions[index - 1].date)) {
          transaction.isExpense
            ? (sum -= transaction.amount)
            : (sum += transaction.amount);
        } else {
          result.push({
            value: sum,
            name,
            balance,
          });
          sum = transaction.amount;
          name = formatDate(transaction.date);
        }
      }

      if (index === transactions.length - 1) {
        result.push({
          value: sum,
          name,
          balance,
        });
      }
    });

    return result;
  }
);

export const selectColumns = createSelector(
  selectTransactions,
  (transactions: TransactionInterface[]): ColumnsChartInterface[] => {
    const result: ColumnsChartInterface[] = [];

    let name = '';
    let expense = 0;
    let income = 0;

    transactions = transactions.reverse();

    transactions.forEach((transaction, index, arr) => {
      name = formatDate(transaction.date, 'short');
      transaction.isExpense
        ? (expense += transaction.amount)
        : (income += transaction.amount);

      if (index < arr.length - 1) {
        if (name !== formatDate(arr[index + 1].date, 'short')) {
          result.push({
            name,
            expense,
            income,
          });
          income = 0;
          expense = 0;
        }
      } else {
        result.push({
          name,
          expense,
          income,
        });
      }
    });

    return result;
  }
);
