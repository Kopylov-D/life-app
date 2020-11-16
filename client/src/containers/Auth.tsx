import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { validate } from '../utils/form';
import { Button, Input, Toast } from '../components/UI';
import Error from '../components/Error';
import { useHttp } from '../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin, login, register } from '../store/ducks/auth/actions';
import { RootState } from '../store/rootReducer';

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
				minLength: 6,
				notCyrillic: true,
			},
		},
	});

	const { loading, request, error, clearError } = useHttp();
	const [showMessage, setShowMessage] = useState<boolean>(false);
	const { auth } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	setShowMessage(true)
	// 	setTimeout(() => {
	// 		setShowMessage(false);
	// 		clearError()
	// 	}, 2500);

	// }, [error, clearError])

	useEffect(() => {
		// clearError();
	}, [error, clearError]);

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
		// dispatch(register(formControls.login.value, formControls.password.value));
		dispatch(autoLogin())
	};

	const loginHandler = async () => {
		dispatch(login(formControls.login.value, formControls.password.value));
	};

	return (
		<div className={classNames('auth')}>
			{/* <Logo /> */}
			{/* {showMessage ? <Toast text={error}/> : null} */}
			<form className={classNames('auth__main')} onSubmit={submitHandler}>
				<header>LifeUp</header>
				{auth.errorMessage ? <Error textError={auth.errorMessage} /> : null}
				{renderInputs()}
				<div className="auth__buttons">
					<Button
						disabled={!isFormValid}
						type="primary"
						onClick={loginHandler}
						isLoading={loading}
					>
						Войти
					</Button>
					<Button
						disabled={!isFormValid}
						type="secondary"
						onClick={registerHandler}
						isLoading={loading}
					>
						Регистрация
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Auth;
