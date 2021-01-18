import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, deleteTransaction, getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectCurrentCategory,
	selectIsLoading,
	selectOptions,
	selectTransactions,
} from '../../../store/ducks/budget/selectors';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';
import Table from '../../Table';
import NewTransaction from './NewTransaction';
import Transaction from './Transaction';

const Operations: React.FC = () => {
	const dispatch = useDispatch();

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const changeDateHandler = (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) => {
		dispatch(getBudgetData(year, month, all, fullYear));
	};

	const onAddTransactionHandler = (
		categoryId: string,
		amount: number,
		isExpense: boolean,
		currentDate: Date | Date[]
	) => {
		dispatch(addTransaction(categoryId, amount, isExpense, currentDate));
	};

	const onDeleteTransactionHandler = (_id: string) => {
		dispatch(deleteTransaction(_id));
	};

	return (
		<Fragment>
			<div className="budget__panel">
				<DatePanel
					changeDate={changeDateHandler}
					startDate={options.startDate}
				/>
			</div>
			{isLoading ? (
				<Loader type="cube-grid" />
			) : (
				<div>
					<Table class="" headerItems={['Дата', 'Значение', 'Категория']}>
						<NewTransaction
							categories={categories}
							currentCategory={currentCategory}
							onAddTransaction={onAddTransactionHandler}
						/>

						{transactions.map(item => {
							return (
								<Transaction
									key={item._id}
									_id={item._id}
									category={item.category}
									user={item.user}
									date={item.date}
									amount={item.amount}
									isExpense={item.isExpense}
									onDeleteTransaction={onDeleteTransactionHandler}
								/>
							);
						})}
					</Table>
				</div>
			)}
		</Fragment>
	);
};

export default Operations;
