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
import { TransactionInterface } from '../../store/ducks/budget/types';

interface Props {
	onToggleCalendar(): void;
	// onOpenTransactions(): void;
	// onChangeTransaction(e: React.MouseEvent, id: string): void;
	// onDeleteTransaction(id: string): void;
	onAddTransaction(id: string, amount: number): void;
}

const NewTransaction: React.FC<Props> = props => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const _id = '1'

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

	const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && control.valid) {
			const amount = +control.value;
			setControl({ ...control, value: '' });
			props.onAddTransaction(_id, amount);
		} else if (event.key === 'Enter' && !control.valid) {
			setControl({ ...control, value: '' });
		}
	};

	return (
		<div className="table__item">
			<div>22/01/2222</div>
			<Input
				value={control.value}
				class={control.class}
				type={control.type}
				valid={control.valid}
				touched={control.touched}
				shouldValidate={!!control.validation}
				onChange={onChangeHandler}
				onKeyPress={onKeyEnter}
				// onClick={props.onToggleCalendar}
			/>
			<div>Продукты</div>
			<div className="options">
				<img src={calendar} alt="" onClick={props.onToggleCalendar}></img>
			</div>
		</div>
	);
};

export default NewTransaction;
