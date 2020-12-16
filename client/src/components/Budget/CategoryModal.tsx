import React, { useRef, useEffect, useState } from 'react';
import { Input, Button } from '../UI';
import {
	createControl,
	FormControl,
	validate,
} from '../../services/validations/form';
import Switch from './Switch';
import { CategoryInterface } from '../../store/ducks/budget/types';
import Backdrop from '../UI/Backdrop';
import ModalTemplate from '../UI/ModalTemplate';

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

const CategoryModal: React.FC<Props> = ({ title, category, onClick, onCloseClick }) => {
	const [control, setControl] = useState<FormControl>(
		createControl({ type: 'text', class: 'modal' }, { required: true })
	);

	const [isExpense, setIsExpense] = useState<boolean>(true);
	// const refInput = useRef();

	// useEffect(() => {
	//   refInput.current.focus();
  // }, []);
  
  useEffect(() => {
    if (category) {
      setIsExpense(category.isExpense)
    }
  }, [])

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

	return (
		<Backdrop onClick={onCloseClick}>
			<ModalTemplate title={title}>
				<form
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
				<div className="modal__buttons">
					<Button type="primary" size='small' disabled={false} onClick={onOkClickHandler}>
						Ок
					</Button>
					<Button type="secondary" size='small' disabled={false} onClick={onCloseClick}>
						Отмена
					</Button>
				</div>
			</ModalTemplate>
		</Backdrop>
		// <Fragment>
		// 	<div className="modal">
		// 		<label className="modal__title">{title}</label>
		// 		<form
		// 			onSubmit={e => {
		// 				onSubmit(e);
		// 			}}
		// 		>
		// 			<Input
		// 				// refInput={refInput}
		// 				value={control.value}
		// 				class={control.class}
		// 				type={control.type}
		// 				valid={control.valid}
		// 				touched={control.touched}
		// 				shouldValidate={!!control.validation}
		// 				onChange={onChangeHandler}
		// 				onKeyPress={e => onEnterKeyPress(e)}
		// 			/>

		// 			<Switch
		// 				colorLeft="color-expense"
		// 				colorRight="color-income"
		// 				textLeft="Расходы"
		// 				textRight="Доходы"
		// 				onSwitch={setIsExpense}
		// 				flag={isExpense}
		// 			/>
		// 		</form>
		// 		<div className="modal__buttons">
		// 			<Button type="primary" size='small' disabled={false} onClick={onOkClickHandler}>
		// 				Ок
		// 			</Button>
		// 			<Button type="secondary" size='small' disabled={false} onClick={onCloseClick}>
		// 				Отмена
		// 			</Button>
		// 		</div>
		// 	</div>
		// 	{/* <Backdrop onClick={onCancelModalClick} onKeyPress={onKeyPress} /> */}
		// 	{/* <div className="backdrop backdrop__modal"></div> */}
		// </Fragment>
	);

};

export default CategoryModal;
