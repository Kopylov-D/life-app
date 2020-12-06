import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import {
	addTransaction,
	changeCategory,
	deleteCategory,
} from '../../store/ducks/budget/actions';
import { selectTransactions } from '../../store/ducks/budget/selectors';
import Modal, { Params } from '../UI/Modal';
import TableItem from './TableItem';
import { CategoryInterface, TransactionInterface } from '../../store/ducks/budget/types';
import NewTransaction from './NewTransaction';
import Transaction from './Transaction';

type Props = {
	// transactions: TransactionInterface[]
	transactions: TransactionInterface[];
	onDeleteHandler(id: string): void
};

const OperationsTable: React.FC<Props> = ({transactions, onDeleteHandler}) => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
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

	const onAddTransactionHandler = (id: string, amount: number) => {
		dispatch(addTransaction(id, amount, currentDate));
	};

	const onChangeDateHandler = (value: Date | Date[]) => {
		setCurrentDate(value);
		onToggleCalendarHandler();
	};

	const onToggleCalendarHandler = () => {
		setCalendarIsOpen(isOpen => !isOpen);
	};

	// const onSubmitModalHandler = (e: React.SyntheticEvent) => {
	// 	e.preventDefault()
	// 	// onOkModalClick()
	// }

	return (
		<div className="table">
			<header className="table__header">
				<div>Дата</div>
				<div>Значение</div>
				<div>Категория</div>
			</header>

			<div className="table__body">
				<NewTransaction
					// onChangeCategory={onChangeCategoryHandler}
					// onDeleteCategory={onDeleteCategoryHandler}
					// onOpenTransactions={onOpenTransactionsHandler}
					onToggleCalendar={onToggleCalendarHandler}
					onAddTransaction={onAddTransactionHandler}
				/>

				{transactions.map(item => {
					return (
						<Transaction
							key={item._id}
              _id={item._id}
              // __v={item.__v}
              category={item.category}
              user={item.user}
              date={item.date}
							// name={item.name}
							amount={item.amount}
							onChangeTransaction={onChangeCategoryHandler}
							onDeleteTransaction={onDeleteHandler}
						/>
					);
				})}
			</div>

			{modalIsOpen && (
				<Modal
					title="Изменить категорию"
					onClick={onOkModalClick}
					onCloseClick={onCancelModalClick}
					// onSubmit={onSubmitModalHandler}
				/>
			)}

			{calendarIsOpen && (
				<Fragment>
					<div className="calendar">
						<div
							className="backdrop backdrop__modal"
							onClick={onToggleCalendarHandler}
						></div>
						<Calendar value={currentDate} onChange={onChangeDateHandler} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default OperationsTable;
