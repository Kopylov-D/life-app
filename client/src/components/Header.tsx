import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/ducks/auth/actions';
import { ContractIcon, ExpandIcon, LogoIcon, LogoutIcon } from './UI/Icons';
import Icon from './UI/Icons/Icon';

const Header = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			setIsFullScreen(true);
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				setIsFullScreen(false);
				document.exitFullscreen();
			}
		}
	};

	return (
		<header className="main__header">
			<div className="main__header-navigation">
				<Icon classNames="logo">
					<LogoIcon />
				</Icon>
				<h1>LifeUp</h1>
				<nav>
					<NavLink to="/budget" activeClassName="active">
						Финансы
					</NavLink>
					{/* <NavLink to="/notes" activeClassName="active">
						Заметки
					</NavLink> */}
					<NavLink to="/todos" activeClassName="active">
						Задачи
					</NavLink>
					{/* <NavLink to="/statistic" activeClassName="active">
						Статистика
					</NavLink> */}
				</nav>
			</div>

			<div className="main__header-controls">
				<div className="main__header-screen" onClick={toggleFullScreen}>
					{isFullScreen ? (
						<Icon classNames="contract">
							<ContractIcon />
						</Icon>
					) : (
						<Icon classNames="expand">
							<ExpandIcon />
						</Icon>
					)}
				</div>

				<div className="main__header-logout">
					<Icon classNames="logout" onClick={logoutHandler}>
						<LogoutIcon />
					</Icon>
				</div>
			</div>
		</header>
	);
};

export default Header;
