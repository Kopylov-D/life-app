import e from 'express';
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Input, Button } from '../../UI';
import {
	createControl,
	FormControl,
	validate,
} from '../../../services/validations/form';

export interface Params {
	value: string
	isExpense: boolean
	color?: string
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
		onClick({value: control.value, isExpense: true});
	};

	const onEnterKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onOkClickHandler()
		}
	}

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
	}

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
					<Button type="primary" disabled={false} onClick={onOkClickHandler}>
						Ок
					</Button>
					<Button type="secondary" disabled={false} onClick={onCloseClick}>
						Отмена
					</Button>
				</div>
			</div>
			{/* <Backdrop onClick={onCancelModalClick} onKeyPress={onKeyPress} /> */}
			{/* <div className="backdrop backdrop__modal"></div> */}
		</Fragment>
	);
	// return (
	//   <Fragment>
	//     <div className={classes.Modal}>
	//       <label>{modal.title}</label>
	//       <form
	//         onSubmit={event => {
	//           onSubmitModal(event);
	//         }}
	//       >
	//         <Input
	//           refInput={refInput}
	//           type={modal.inputType}
	//           style={modal.style}
	//           onChange={onChangeModal}
	//         />
	//       </form>
	//       <div className={classes.buttons}>
	//         <Button type="success" onClick={onOkModalClick}>
	//           Ок
	//         </Button>
	//         <Button type="primary" onClick={onCancelModalClick}>
	//           Отмена
	//         </Button>
	//         <Button type="error" onClick={onDeleteModalClick}>
	//           Удалить категорию
	//         </Button>
	//       </div>
	//     </div>
	//     <Backdrop onClick={onCancelModalClick} onKeyPress={onKeyPress} />
	//   </Fragment>
	// );
};

export default Modal;
