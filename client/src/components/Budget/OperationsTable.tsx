import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	addTransaction,
	changeCategory,
} from '../../store/ducks/budget/actions';

import Modal, { Params } from '../UI/Modal';

import {
	CategoryInterface,
	TransactionInterface,
} from '../../store/ducks/budget/types';
import NewTransaction from './NewTransaction';
import Transaction from './Transaction';

type Props = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	currentCategory: CategoryInterface;
	onDeleteTransaction(id: string): void;
};

const OperationsTable: React.FC<Props> = ({
	transactions,
	categories,
	currentCategory,
	onDeleteTransaction,
}) => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [currentCategoryId, setCurrentCategoryId] = useState<string>('');

	const dispatch = useDispatch();

	const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
		e.preventDefault();
		setCurrentCategoryId(id);
		setModalIsOpen(true);
	};

	const onOkModalClick = (params: Params): void => {
		dispatch(changeCategory(currentCategoryId, params.value, 'red'));
		setModalIsOpen(false);
	};

	const onCancelModalClick = () => {
		setModalIsOpen(false);
		console.log('Cancel modal');
	};

	const onAddTransactionHandler = (
		id: string,
		amount: number,
		isExpense: boolean,
		currentDate: Date | Date[]
	) => {
		dispatch(addTransaction(id, amount, currentDate, isExpense));
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
							onChangeTransaction={onChangeCategoryHandler}
							onDeleteTransaction={onDeleteTransaction}
						/>
					);
				})}
			</div>

			{modalIsOpen && (
				<Modal
					title="Изменить категорию"
					onClick={onOkModalClick}
					onCloseClick={onCancelModalClick}
				/>
			)}
		</div>
	);
};

export default OperationsTable;
