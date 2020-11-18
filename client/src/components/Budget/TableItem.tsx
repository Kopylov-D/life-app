import React, { useState } from 'react';
import { Input } from '../UI';

const TableItem = () => {
	const [value, setValue] = useState<string>('')

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {

	}

	return (
		<div className='table-item'>
			<div>Продукты</div>
			<Input value={value} onChange={onChangeHandler} />
			<div>2000 руб.</div>
			<div className='options'>
				<div>date</div>
				<div>gear</div>
				<div>del</div>
			</div>
		</div>
	);
};

export default TableItem;
