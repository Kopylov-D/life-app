import React from 'react';
import { validate } from '../utils/form';
import classNames from 'classnames';
import { Input } from '../components/UI';
import { useHttp } from '../hooks/http.hook';

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
};

type IFormControls = {
	login: IFormControl;
	password: IFormControl;
};

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

	const { loading, request, error } = useHttp();

	const submitHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
	};

	const onChangeHandler1 = (
		event: React.ChangeEvent<HTMLInputElement>,
		controlName: keyof typeof formControls
	): void => {
		const newFormControls = { ...formControls };
		const control = { ...formControls[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validate(control.value, control.validation);

		newFormControls[controlName] = control;

		let formValid = true;
		(Object.keys(formControls) as Array<keyof typeof formControls>).forEach(
			(name: keyof typeof formControls) => {
				formValid = newFormControls[name].valid && formValid;
			}
		);

		setFormControls(newFormControls);
		setIsFormValid(formValid);
	};

	const onChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
		// controlName: keyof typeof formControls
	): void => {
		const newFormControls = { ...formControls };
		const control = { ...formControls.login };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validate(control.value, control.validation);

		newFormControls.login = control;

		let formValid = true;

		formValid = control.valid && formValid;

		setFormControls(newFormControls);
		setIsFormValid(formValid);
	};

	const renderInputs = () => {
		return (Object.keys(formControls) as Array<keyof typeof formControls>).map(
			(controlName: keyof typeof formControls, index: number) => {
				const control = formControls[controlName];
				// разобраться как вынести функцию наружу
				const onChangeHandler2 = (
					event: React.ChangeEvent<HTMLInputElement>
					// controlName: keyof typeof formControls
				): void => {
					const newFormControls = { ...formControls };
					const control = { ...formControls[controlName] };

					control.value = event.target.value;
					control.touched = true;
					control.valid = validate(control.value, control.validation);

					newFormControls[controlName] = control;

					let formValid = true;
					(Object.keys(formControls) as Array<
						keyof typeof formControls
					>).forEach((name: keyof typeof formControls) => {
						formValid = newFormControls[name].valid && formValid;
					});

					setFormControls(newFormControls);
					setIsFormValid(formValid);
				};
				return (
					<Input
						key={index}
						label={control.label}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						// optionalLabel={control.optionalLabel}
						onChange={onChangeHandler2}
					/>
				);
			}
		);
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {
				email: formControls.login.value,
				password: formControls.password.value,
			});
			console.log(data)
			// message(data.message);
		} catch (e) {}
	};

	return (
		<div className={classNames('auth')}>
			{/* <Logo /> */}
			<form className={classNames('auth__main')} onSubmit={submitHandler}>
				<header>LifeUp</header>
				{/* {responseError ? <Error textError={responseError} /> : null} */}
				{renderInputs()}
				{/* <Button
					disabled={!isFormValid}
					onClick={loginHandler}
					isLoading={isLoading}
				> */}
				{/* Войти
				</Button> */}
				<button onClick={registerHandler}>регистр</button>
			</form>
		</div>
	);
};

export default Auth;
