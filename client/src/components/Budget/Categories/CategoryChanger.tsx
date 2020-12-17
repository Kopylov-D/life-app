import React, { useRef, useEffect, useState, Fragment } from 'react';
import { Input, Button } from '../../UI';
import {
	createControl,
	FormControl,
	validate,
} from '../../../services/validations/form';
import Switch from '../../UI/Switch';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import Backdrop from '../../UI/Backdrop';
import Modal from '../../UI/Modal';

export interface Params {
	value: string;
	type?: 'add' | 'change';
	isExpense: boolean;
	color?: string;
}

interface Props {
	title: string;
	// isExpense: boolean;
	category?: CategoryInterface;
	onClick(params: Params): void;
	onCloseClick(): void;
}

const CategoryChanger: React.FC<Props> = ({
	title,
	category,
	onClick,
	onCloseClick,
}) => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'category-changer' },
			{ required: true }
		)
	);

	const [isExpense, setIsExpense] = useState<boolean>(true);
	// const refInput = useRef();

	// useEffect(() => {
	//   refInput.current.focus();
	// }, []);

	useEffect(() => {
		if (category) {
			setIsExpense(category.isExpense);
		}
	}, []);

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

	const onOkClickHandler = () => {
		onClick({ value: control.value, isExpense });
	};

	const onEnterKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onOkClickHandler();
		}
	};

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	console.log(';sdfsdf');

	return (
		<Fragment>
			{/* <Backdrop onClick={onCloseClick} /> */}
			<Modal title={title} closeModal={onCloseClick} backdropType='black'>
				<form
					className="category-changer"
					onSubmit={e => {
						onSubmit(e);
					}}
				>
					<Input
						// refInput={refInput}
						value={control.value}
						class={control.class}
						type={control.type}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						onChange={onChangeHandler}
						onKeyPress={e => onEnterKeyPress(e)}
					/>

					<Switch
						colorLeft="color-expense"
						colorRight="color-income"
						textLeft="Расходы"
						textRight="Доходы"
						onSwitch={setIsExpense}
						flag={isExpense}
					/>
				</form>
				<div className="category-changer__buttons">
					<Button
						type="primary"
						size="small"
						disabled={false}
						onClick={onOkClickHandler}
					>
						Ок
					</Button>
					<Button
						type="secondary"
						size="small"
						disabled={false}
						onClick={onCloseClick}
					>
						Отмена
					</Button>
				</div>
			</Modal>
		</Fragment>
	);
};

export default CategoryChanger;
