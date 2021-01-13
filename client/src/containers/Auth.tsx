import React, { useEffect } from 'react';
import classNames from 'classnames';

// import {
// 	createControl,
// 	FormControl,
// 	validate,
// } from '../services/validations/form';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Error from '../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/ducks/auth/actions';
import { RootState } from '../store/rootReducer';

import BgImg from '../assets/img/bg.png';
import { useInput } from '../hooks/input.hook';

// type FormControls = {
// 	login: FormControl;
// 	password: FormControl;
// };

const Auth = () => {
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
	const email = useInput(
		{ initialValue: '' },
		{
			required: true,
			minLength: 8,
			email: true,
		}
	);

	const password = useInput(
		{ initialValue: '' },
		// { required: true,}
	);

	// const [formControls, setFormControls] = React.useState<FormControls>({
	// 	login: createControl(
	// 		{ type: 'text', placeholder: 'Email' },
	// 		{ required: true, notCyrillic: true }
	// 	),
	// 	password: createControl(
	// 		{ type: 'password', placeholder: 'Пароль' },
	// 		{ required: true, minLength: 6, notCyrillic: true }
	// 	),
	// });

	const { isLoading, message } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (email.valid && password.valid) {
			console.log(isFormValid);
			
			setIsFormValid(true);

		}
	}, [email.value, password.value]);

	const submitHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
	};

	// const renderInputs = () => {
	// 	return (Object.keys(formControls) as Array<keyof typeof formControls>).map(
	// 		(controlName: keyof typeof formControls, index: number) => {
	// 			const control = formControls[controlName];
	// 			// разобраться как вынести функцию наружу
	// 			const onChangeHandler2 = (
	// 				event: React.ChangeEvent<HTMLInputElement>
	// 				// controlName: keyof typeof formControls
	// 			): void => {
	// 				const newFormControls = { ...formControls };
	// 				const control = { ...formControls[controlName] };

	// 				control.value = event.target.value;
	// 				control.touched = true;
	// 				control.valid = validate(control.value, control.validation);

	// 				newFormControls[controlName] = control;

	// 				let formValid = true;
	// 				(Object.keys(formControls) as Array<
	// 					keyof typeof formControls
	// 				>).forEach((name: keyof typeof formControls) => {
	// 					formValid = newFormControls[name].valid && formValid;
	// 				});

	// 				setFormControls(newFormControls);
	// 				setIsFormValid(formValid);
	// 			};

	// 			return (
	// 				<Input
	// 					key={index}
	// 					label={control.label}
	// 					placeholder={control.placeholder}
	// 					type={control.type}
	// 					value={control.value}
	// 					valid={control.valid}
	// 					touched={control.touched}
	// 					shouldValidate={!!control.validation}
	// 					onChange={onChangeHandler2}
	// 				/>
	// 			);
	// 		}
	// 	);
	// };

	const registerHandler = async () => {
		dispatch(register(email.value, password.value));
	};

	const loginHandler = async () => {
		dispatch(login(email.value, password.value));
	};

	return (
		<div
			className="auth__bg"
			style={{
				backgroundImage: `url(${BgImg})`,
				backgroundSize: '100%',
				backgroundRepeat: 'no-repeat',
				// backgroundPosition: 'center-top',
			}}
		>
			<div className={classNames('auth')}>
				<form className={classNames('auth__main')} onSubmit={submitHandler}>
					<header>Авторизация</header>
					{message ? <Error textError={message} /> : null}
					<div className="auth__inputs">
						<Input
							onChange={email.onChange}
							value={email.value}
							placeholder="Email"
							touched={email.touched}
							valid={email.valid}
							type="text"
							className="auth"
							errorMessage={email.errorMessages}
						/>
						<Input
							onChange={password.onChange}
							value={password.value}
							placeholder="Пароль"
							touched={password.touched}
							valid={password.valid}
							type="password"
							className="auth"
							errorMessage={password.errorMessages}
						/>
					</div>

					<div className="auth__buttons">
						<Button
							disabled={!isFormValid}
							color="primary"
							onClick={loginHandler}
							isLoading={isLoading}
						>
							Войти
						</Button>

						<div onClick={registerHandler}>Зарегистрироваться</div>
						{/* <Button
							disabled={!isFormValid}
							color="secondary"
							onClick={registerHandler}
							isLoading={isLoading}
						>
							Регистрация
						</Button> */}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Auth;
