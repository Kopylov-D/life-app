import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import {
	changeCategory,
	deleteCategory,
} from '../../store/ducks/budget/actions';
import Modal, { Params } from '../UI/Modal';
import TableItem from './TableItem';
import { CategoryInterface } from '../../store/ducks/budget/types';

type Props = {
	// transactions: TransactionInterface[]
	categories: CategoryInterface[];
};

const Table: React.FC<Props> = ({ categories }) => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [currentCategoryId, setCurrentCategoryId] = useState<string>('');

	const dispatch = useDispatch();

	const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
		e.preventDefault();
		setCurrentCategoryId(id);
		setModalIsOpen(true);
	};
	
	const onDeleteCategoryHandler = async (id: string) => {
		dispatch(deleteCategory(id));
	};

	const onOkModalClick = (params: Params): void => {
		console.log('Modal okClick', params, currentCategoryId);

		dispatch(changeCategory(currentCategoryId, params.value, 'red'));
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
				{categories.map(item => {
					return (
						<TableItem
							key={item._id}
							_id={item._id}
							name={item.name}
							amount={item.amount}
							onChangeCategory={onChangeCategoryHandler}
							onDeleteCategory={onDeleteCategoryHandler}
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
