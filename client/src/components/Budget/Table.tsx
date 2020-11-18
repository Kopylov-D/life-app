import React from 'react';
import TableItem from './TableItem';

// const Table = () => {
// 	return (
// 		<table className="table">
// 			<thead className="table__header">
// 				<tr>
// 					<th>Категория</th>
// 					<th>Ввод</th>
// 					<th>Сумма</th>
// 					<th>gecnj</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{/* <tr>
// 					<td>Продукты</td>
// 					<td>ввод</td>
// 					<td>2000 руб.</td>
// 					<td>dfgdfg</td>
// 				</tr> */}
// 				<TableItem /> 
// 				<TableItem />
// 				<TableItem />
// 			</tbody>
// 		</table>
// 	);
// };

const Table = () => {
	return (
		<div className="table">

				<header className="header">
					<div>Категория</div>
					<div>Ввод</div>
					<div>Сумма</div>
					<div>gecnj</div>
				</header>
			<div className='tbody'>
				<TableItem /> 
				<TableItem />
				<TableItem />
			</div>
		</div>
	);
};

export default Table;
