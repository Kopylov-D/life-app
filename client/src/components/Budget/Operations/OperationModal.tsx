import React, { Fragment, useState } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import {
	createControl,
	FormControl,
	validate,
} from '../../../services/validations/form';

export interface Params {
	value: string;
	isExpense: boolean;
	color?: string;
}

interface Props {
	title: string;
	// onSubmit(e: React.SyntheticEvent): void;
	onClick(params: Params): void;
	onCloseClick(): void;
}


const Modal: React.FC<Props> = ({ title, onClick, onCloseClick }) => {
	const [control, setControl] = useState<FormControl>(
		createControl({ type: 'text', class: 'modal' }, { required: true })
	);
	// const refInput = useRef(null);

	// useEffect(() => {
	//   refInput.current.focus();
	// }, []);

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
		onClick({ value: control.value, isExpense: true });
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
		<Fragment>
			<div className="modal">
				<label>{title}</label>
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
				</form>
				<div className="modal__buttons">
					<Button color="primary" disabled={false} onClick={onOkClickHandler}>
						Ок
					</Button>
					<Button color="secondary" disabled={false} onClick={onCloseClick}>
						Отмена
					</Button>
				</div>
			</div>
		</Fragment>
	)
};

export default Modal;
