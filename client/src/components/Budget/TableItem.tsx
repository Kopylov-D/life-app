import React, { useState } from 'react';
import { api } from '../../api/httpApi';
import { createControl, FormControl, validate } from '../../utils/form';
import { Input } from '../UI';

const TableItem = () => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table-input' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const onChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value;
		setControl({
			...control,
			value,
			valid: validate(value, control.validation),
		});
		event.target.value = '';
	};

	const onKeyEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && control.valid) {
			const amount = control.value;
			console.log(amount)
			try {
				// const response = await api.addTransaction(amount);
				// console.log(response)

			} catch(e) {
				console.log('Ошибка транзакции', e)
			}
		}
	};

	return (
		<div className="table__item">
			<div>Продукты</div>
			<Input
				value={control.value}
				class={control.class}
				type={control.type}
				valid={control.valid}
				touched={control.touched}
				shouldValidate={!!control.validation}
				onChange={onChangeHandler}
				onKeyPress={onKeyEnter}
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
