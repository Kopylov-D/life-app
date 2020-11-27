import React, { useState } from 'react';

import {
	createControl,
	FormControl,
	validate,
} from '../../services/validations/form';
import { Input } from '../UI';
import gear from '../../assets/img/gear.svg';
import trash from '../../assets/img/trash.svg';
import calendar from '../../assets/img/calendar.svg';

interface Props {
	// key: string
	_id: string;
	name: string;
	amount: number;
	onOpenTransactions(): void;
	onChangeCategory(e: React.MouseEvent, id: string): void;
	onDeleteCategory(): void;
}

const TableItem: React.FC<Props> = props => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);

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
			const categoryName = 'ПРОДУКТЫ';
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
			<div>{props.name}</div>
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
			<div>{props.amount} руб.</div>
			<div className="options">
				<img src={calendar} alt="" onClick={props.onOpenTransactions}></img>
				<img
					src={gear}
					alt=""
					onClick={e => props.onChangeCategory(e, props._id)}
				></img>
				<img src={trash} alt="" onClick={props.onDeleteCategory}></img>
			</div>
		</div>
	);
};

export default TableItem;
