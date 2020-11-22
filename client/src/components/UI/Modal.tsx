import classes from '*.module.css';
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Input, Button } from '.';
import { createControl, FormControl, validate } from '../../services/validations/form';

interface Props {
	title: string;
	onSubmit(): void;
	onClick(): void;
	onCloseClick(): void;
}

const Modal: React.FC<Props> = props => {
	const [control, setControl] = useState<FormControl>(
		createControl({ type: 'text' }, { required: true })
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

	return (
		<Fragment>
			<div className="modal">
				<label>{props.title}</label>
				<form
				// onSubmit={event => {
				//   onSubmitModal(event);
				// }}
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
					/>
				</form>
				<div className={classes.buttons}>
					<Button type="primary" disabled={false} onClick={props.onClick}>
						Ок
					</Button>
					<Button type="secondary" disabled={false} onClick={props.onCloseClick}>
						Отмена
					</Button>
				</div>
			</div>
			{/* <Backdrop onClick={onCancelModalClick} onKeyPress={onKeyPress} /> */}
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
