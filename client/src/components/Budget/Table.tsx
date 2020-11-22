import React, { useState } from 'react';
import { api } from '../../services/api';
import { TransactionInterface } from '../../store/ducks/budget/types';
import TableItem from './TableItem';

type Props = {
	// transactions: TransactionInterface[]
}

const Table = () => {
	// const testHandler1 = async () => {
	// 	try {
	// 		// const response = await api.getUser()
	// 		const response = await api.addTransaction(5)
	// 		console.log(response)
	// 	} catch(e) {
	// 		console.log(e)
	// 	}
	// }
	// const testHandler2 = async () => {
	// 	try {
	// 		const response = await api.getUser()
	// 		// const response = await api.addTransaction()
	// 		console.log(response)
	// 	} catch(e) {
	// 		console.log(e)
	// 	}
	// }

	return (
		<div className="table">
			<header className="table__header">
				<div >Категория</div>
				<div >Ввод</div>
				<div>Сумма</div>
				{/* <div></div> */}
			</header>

			<div className="table__body">

					 <TableItem/>

			</div>
		</div>
	);
};

export default Table;
