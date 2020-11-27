import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../services/api';
import { changeCategory } from '../../store/ducks/budget/actions';
import {
	selectCategories,
	selectExample,
} from '../../store/ducks/budget/selectors';
import { TransactionInterface } from '../../store/ducks/budget/types';
import { RootState } from '../../store/rootReducer';
import Modal, { Params } from '../UI/Modal';
import TableItem from './TableItem';

type Props = {
	// transactions: TransactionInterface[]
};

const Table = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [currentCategoryId, setCurrentCategoryId] = useState<string>('')
	const data = useSelector((state: RootState) => selectCategories(state));
	// const data = useSelector((state: RootState) => state.budget.categories);
	const categories = useSelector(selectExample);

	const dispatch = useDispatch()

	// console.log('categories', categories)
	// console.log('data', data)

	const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
		e.preventDefault();
		// console.log('id', id);
		setModalIsOpen(true)
	};
	const onDeleteCategoryHandler = () => {};
	const onOpenTransactionsHandler = () => {};

	const onOkModalClick = (params: Params): void => {
		console.log('Modal okClick', params, currentCategoryId);

		dispatch(changeCategory(currentCategoryId, params.value, 'red'))
		setModalIsOpen(false);
	};

	const onCancelModalClick = () => {
		setModalIsOpen(false);
		console.log('Cancel modal');
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
		</div>
	);
};

export default Table;
