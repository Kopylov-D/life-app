import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../services/api';
import { getTransactionsData } from '../../store/ducks/budget/actions';
import { TransactionInterface } from '../../store/ducks/budget/types';
import { RootState } from '../../store/rootReducer';
import { createControl, FormControl, validate } from '../../services/validations/form';
import { Input } from '../UI';

interface Props {
	// key: string
}

const TableItem: React.FC<Props> = (props) => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table-input' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false)




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
			const amount = +control.value;
			const categoryName = 'ПРОДУКТЫ'
			setControl({ ...control, value: '' });
			// try {
			// 	const response = await api.addTransaction(amount, categoryName);
			// 	console.log(response);
			// } catch (e) {
			// 	console.log('Ошибка транзакции', e);
			// }


		} else if (event.key === 'Enter' && !control.valid) {
			setControl({ ...control, value: '' });
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
