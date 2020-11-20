import React from 'react';
import { api } from '../../api/httpApi';
import TableItem from './TableItem';

const Table = () => {

	const testHandler1 = async () => {
		try {
			// const response = await api.getUser()
			const response = await api.addTransaction()
			console.log(response)
		} catch(e) {
			console.log(e)
		}
	}
	const testHandler2 = async () => {
		try {
			const response = await api.getUser()
			// const response = await api.addTransaction()
			console.log(response)
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<div className="table">
			<header className="table__header" onClick={testHandler1}>
				<div onClick={testHandler1}>Категория</div>
				<div onClick={testHandler2}>Ввод</div>
				<div>Сумма</div>
				{/* <div></div> */}
			</header>

			{/* <div className="table__body"> */}
				<TableItem />
				<TableItem />
				<TableItem />
			{/* </div> */}
		</div>
	);
};

export default Table;
