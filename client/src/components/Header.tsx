import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className="main__header">
			<h1>LifeUp</h1>
			<nav>
				<NavLink to="/budget">Финансы</NavLink>
				<NavLink to="/notes">Заметки</NavLink>
				<NavLink to="/todos">Задачи</NavLink>
				<NavLink to="/statistic">Статистика</NavLink>
			</nav>
		</header>
	);
};

export default Header;
