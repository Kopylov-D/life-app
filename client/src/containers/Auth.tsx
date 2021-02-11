import React, { useEffect } from 'react';
import classNames from 'classnames';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Error from '../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/ducks/auth/actions';
import { RootState } from '../store/rootReducer';

// import BgImg from '../assets/img/bg.png';
import BgImg from '../assets/img/bg1.jpg';
import { useInput } from '../hooks/input.hook';
import { NavLink, useLocation } from 'react-router-dom';
import { selectLoadingStatus } from '../store/ducks/auth/selectors';
import { LoadingStatus } from '../store/types';

const Auth = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const isLogin = location.pathname === '/login';

	console.log(isLogin);

	// const { isLoading, message } = useSelector((state: RootState) => state.auth);

	const loadingStatus = useSelector(selectLoadingStatus)

	const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

	const email = useInput(
		{ initialValue: '' },
		{
			required: true,
			email: true,
		}
	);

	const password = useInput(
		{ initialValue: '' },
		{ required: true, minLength: 6, notCyrillic: true }
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

	useEffect(() => {
		if (email.valid && password.valid) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [email.valid, password.valid]);

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

	const clickHandler = () => {
		if (isLogin) {
			loginHandler();
		} else {
			registerHandler();
		}
	};

	const registerHandler = () => {
		dispatch(register(email.value, password.value));
	};

	const loginHandler = () => {
		dispatch(login(email.value, password.value));
	};

	return (
		<div
			className="auth__bg"
			style={{
				backgroundImage: `url(${BgImg})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className={classNames('auth')}>
				<form className={classNames('auth__main')} onSubmit={submitHandler}>
					<header>{isLogin ? 'Авторизация' : 'Регистрация'}</header>
					{/* {message ? <Error textError={message} /> : null} */}
					<div className="auth__inputs">
						<Input
							onChange={email.onChange}
							value={email.value}
							placeholder="Email"
							touched={email.touched}
							valid={email.valid}
							type="text"
							className="auth"
							messages={email.errorMessages}
						/>
						<Input
							onChange={password.onChange}
							value={password.value}
							placeholder="Пароль"
							touched={password.touched}
							valid={password.valid}
							type="password"
							className="auth"
							messages={password.errorMessages}
						/>
					</div>

					<div className="auth__buttons">
						<Button
							disabled={!isFormValid}
							color="primary"
							onClick={clickHandler}
							isLoading={loadingStatus === LoadingStatus.LOADING}
						>
							{isLogin ? 'Войти' : 'Зарегистрироваться'}
						</Button>

						<div>
							{isLogin ? (
								<NavLink to="/registration">Зарегистрироваться</NavLink>
							) : (
								<NavLink to="/login">Выполнить вход</NavLink>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Auth;
