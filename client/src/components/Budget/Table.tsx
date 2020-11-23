import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../services/api';
import { selectCategories, selectExample } from '../../store/ducks/budget/selectors';
import { TransactionInterface } from '../../store/ducks/budget/types';
import { RootState } from '../../store/rootReducer';
import TableItem from './TableItem';

type Props = {
	// transactions: TransactionInterface[]
};

const Table = () => {
	const data = useSelector((state: RootState) => selectCategories(state));
	const categories = useSelector(selectExample)

	console.log('categories', categories)

	console.log('data', data)

	return (
		<div className="table">
			<header className="table__header">
				<div>Категория</div>
				<div>Ввод</div>
				<div>Сумма</div>
				{/* <div></div> */}
			</header>

			<div className="table__body">
				{data.map(item => {
					return (
					<TableItem key={item._id} name={item.name} amount={item.amount}/>
					)
				})}
				
			</div>
		</div>
	);
};

export default Table;
