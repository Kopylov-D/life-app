import React from 'react';
import { useDispatch } from 'react-redux';
import {
	addTransaction,
	deleteTransaction,
} from '../../../store/ducks/budget/actions';

import {
	CategoryInterface,
	TransactionInterface,
} from '../../../store/ducks/budget/types';
import NewTransaction from './NewTransaction';
import Transaction from './Transaction';

type Props = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	currentCategory: CategoryInterface;
	// onDeleteTransaction(id: string): void;
};

const OperationsTable: React.FC<Props> = ({
	transactions,
	categories,
	currentCategory,
}) => {
	const dispatch = useDispatch();

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
		<div className="table">
			<header className="table__header">
				<div>Дата</div>
				<div>Значение</div>
				<div>Категория</div>
			</header>

			<div className="table__body">
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
			</div>
		</div>
	);
};

export default OperationsTable;
