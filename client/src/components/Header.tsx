import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className="main__header">
			<h1>LifeUp</h1>
			<nav>
				<NavLink to="/budget" activeClassName='active'>Финансы</NavLink>
				<NavLink to="/notes" activeClassName='active'>Заметки</NavLink>
				<NavLink to="/todos" activeClassName='active'>Задачи</NavLink>
				<NavLink to="/statistic" activeClassName='active'>Статистика</NavLink>
			</nav>
		</header>
	);
};

export default Header;
