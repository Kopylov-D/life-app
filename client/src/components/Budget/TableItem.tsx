import React, { useState } from 'react';
import { createControl, FormControl } from '../../utils/form';
import { Input } from '../UI';

const TableItem = () => {
	const [control, setControl] = useState<FormControl>(
		createControl({ type: 'text', class: 'table-input' }, { required: true })
	);

	const onChangeHandler = () => {};

	return (
		<div className="table__item">
			<div>Продукты</div>
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
			<div>2000 руб.</div>
			<div className="options">
				<div>date</div>
				<div>gear</div>
				<div>del</div>
			</div>
		</div>
	);
};

export default TableItem;
