import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/ducks/auth/actions';

const Header = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="main__header">
			<h1>LifeUp</h1>
			<nav>
				<NavLink to="/budget" activeClassName="active">
					Финансы
				</NavLink>
				<NavLink to="/notes" activeClassName="active">
					Заметки
				</NavLink>
				<NavLink to="/todos" activeClassName="active">
					Задачи
				</NavLink>
				<NavLink to="/statistic" activeClassName="active">
					Статистика
				</NavLink>
			</nav>
			<div className="controls">
				<div className="controls__logout" onClick={logoutHandler}>
					Выход
				</div>
			</div>
		</header>
	);
};

export default Header;
