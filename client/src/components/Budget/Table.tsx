import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import {
	addTransaction,
	changeCategory,
	deleteCategory,
} from '../../store/ducks/budget/actions';
import {
	categoriesWithAmount,
	selectTransactions,
} from '../../store/ducks/budget/selectors';
import Modal, { Params } from '../UI/Modal';
import TableItem from './TableItem';

type Props = {
	// transactions: TransactionInterface[]
};

const Table = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
	const [currentCategoryId, setCurrentCategoryId] = useState<string>('');
	const data = useSelector(categoriesWithAmount);
	const transactions = useSelector(selectTransactions);

	// console.log(transactions[0]);
	// const data = useSelector((state: RootState) => state.budget.categories);
	// const data = useSelector(selectExample);

	const dispatch = useDispatch();

	// console.log('categories', categories)
	// console.log('data', data)

	const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
		e.preventDefault();
		setCurrentCategoryId(id);
		setModalIsOpen(true);
	};
	const onDeleteCategoryHandler = async (id: string) => {
		dispatch(deleteCategory(id));
		// const res = await api.deleteCategory(id)
		// console.log(res)
	};
	const onOpenTransactionsHandler = () => {};

	const onOkModalClick = (params: Params): void => {
		console.log('Modal okClick', params, currentCategoryId);

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
				<div>Категория</div>
				<div>Ввод</div>
				<div>Сумма</div>
			</header>

			<div className="table__body">
				{data.map(item => {
					return (
						<TableItem
							key={item._id}
							_id={item._id}
							name={item.name}
							amount={item.amount}
							onChangeCategory={onChangeCategoryHandler}
							onDeleteCategory={onDeleteCategoryHandler}
							onOpenTransactions={onOpenTransactionsHandler}
							onToggleCalendar={onToggleCalendarHandler}
							onAddTransaction={onAddTransactionHandler}
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
							className="select__backdrop"
							onClick={onToggleCalendarHandler}
						></div>
						<Calendar value={currentDate} onChange={onChangeDateHandler} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Table;
