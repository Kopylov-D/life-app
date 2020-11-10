import React from 'react';
import { validate } from '../utils/form';

type IFormControl = {
	value: string;
	type: string;
	label: string;
	valid: boolean;
	touched: boolean;
	validation: {
		required: boolean;
		notCyrillic?: boolean;
		minLength?: number;
	};
}

type IFormControls = {
  login: IFormControl,
  password: IFormControl
}

const Auth = () => {
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
	const [formControls, setFormControls] = React.useState<IFormControls>({
		login: {
			value: '',
			type: 'login',
			label: 'Логин',
			valid: false,
			touched: false,
			validation: {
				required: true,
				notCyrillic: true,
			},
		},
		password: {
			value: '',
			type: 'password',
			label: 'Пароль',
			valid: false,
			touched: false,
			validation: {
				required: true,
				minLength: 8,
				notCyrillic: true,
			},
		},
	});

	const submitHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
  };
  
  // getKeyValue<keyof User, User>("name")(user)

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: keyof typeof formControls): void => {
		const newFormControls = { ...formControls };
		const control = { ...formControls[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validate(control.value, control.validation);

		newFormControls[controlName] = control;

		let formValid = true;
		Object.keys(formControls).forEach((name: keyof typeof newFormControls) => {
			formValid = newFormControls[name].valid && formValid;
		});

		setFormControls(newFormControls);
		setIsFormValid(formValid);
	};

	const renderInputs = () => {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName];
			return (
				<input
					key={index}
					// label={control.label}
					type={control.type}
					value={control.value}
					// valid={control.valid}
					// touched={control.touched}
					// shouldValidate={!!control.validation}
					// optionalLabel={control.optionalLabel}
					onChange={event => onChangeHandler(event, controlName)}
				/>
			);
		});
	};
	return (
		<div className={classNames('auth')}>
			{/* <Logo /> */}
			<form className={classNames('auth__main')} onSubmit={submitHandler}>
				<header>API-консолька</header>
				{/* {responseError ? <Error textError={responseError} /> : null} */}
				{renderInputs()}
				{/* <Button
					disabled={!isFormValid}
					onClick={loginHandler}
					isLoading={isLoading}
				> */}
				{/* Войти
				</Button> */}
			</form>
			<a href="https://github.com/Kopylov-D">Kopylov</a>
		</div>
	);
};

export default Auth;
