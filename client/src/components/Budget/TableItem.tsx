import React from 'react';

const TableItem = () => {
	return (
		<tr className="table__item">
			<td>Продукты</td>
			<td>ввод</td>
			<td>2000 руб.</td>
			<td className='options'>
				<div>date</div>
				<div>gear</div>
				<div>del</div>
			</td>
		</tr>
	);
};

export default TableItem;
