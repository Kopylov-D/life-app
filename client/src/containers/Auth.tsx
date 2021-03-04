import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { selectLoadingStatus } from '../store/ducks/auth/selectors';
import { LoadingStatus } from '../store/types';
import { useInput } from '../hooks/input.hook';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { login, register } from '../store/ducks/auth/actions';
import BgImg from '../assets/img/bg1.jpg';

const Auth = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const isLogin = location.pathname === '/login';
	const loadingStatus = useSelector(selectLoadingStatus);

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
