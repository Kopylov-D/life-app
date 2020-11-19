import React from 'react';
import classNames from 'classnames';

import { createControl, FormControl, validate } from '../utils/form';
import { Button, Input, Toast } from '../components/UI';
import Error from '../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/ducks/auth/actions';
import { RootState } from '../store/rootReducer';

type FormControls = {
	login: FormControl;
	password: FormControl;
};

const Auth = () => {
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
	const [formControls, setFormControls] = React.useState<FormControls>({
		login: createControl(
			{ type: 'text', label: 'Логин'},
			{ required: true, notCyrillic: true }
		),
		password: createControl(
			{ type: 'password', label: 'Пароль'},
			{ required: true, minLength: 6, notCyrillic: true }
		),
	});

	const { isLoading, message } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const submitHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
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
						placeholder={control.placeholder}
						// class={control.class}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						onChange={onChangeHandler2}
					/>
				);
			}
		);
	};

	const registerHandler = async () => {
		dispatch(register(formControls.login.value, formControls.password.value));
	};

	const loginHandler = async () => {
		dispatch(login(formControls.login.value, formControls.password.value));
	};

	return (
		<div className={classNames('auth')}>
			<form className={classNames('auth__main')} onSubmit={submitHandler}>
				<header>LifeUp</header>
				{message ? <Error textError={message} /> : null}
				{renderInputs()}
				<div className="auth__buttons">
					<Button
						disabled={!isFormValid}
						type="primary"
						onClick={loginHandler}
						isLoading={isLoading}
					>
						Войти
					</Button>
					<Button
						disabled={!isFormValid}
						type="secondary"
						onClick={registerHandler}
						isLoading={isLoading}
					>
						Регистрация
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Auth;
