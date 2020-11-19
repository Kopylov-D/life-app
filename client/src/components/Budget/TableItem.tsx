import React, { useState } from 'react';
import { createControl, FormControl } from '../../utils/form';
import { Input } from '../UI';

const TableItem = () => {
	const [control, setControl] = useState<FormControl>(
		createControl({ type: 'text', class: 'table-input' }, { required: true })
	);

	const onChangeHandler = () => {};

	return (
		<tr className="table__item">
			<td>Продукты</td>
			<Input
				value={control.value}
				class={control.class}
				// placeholder={control.placeholder}
				// label={control.label}
				type={control.type}
				valid={control.valid}
				touched={control.touched}
				shouldValidate={!!control.validation}
				onChange={onChangeHandler}
			/>
			<td>2000 руб.</td>
			<td className="options">
				<div>date</div>
				<div>gear</div>
				<div>del</div>
			</td>
		</tr>
	);
};

export default TableItem;
