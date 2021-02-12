import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/ducks/auth/actions';
import compress from '../assets/icons/Compress.svg';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import Icon from './UI/Icons/Icon';

const Header = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		// logout();
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
				<Icon name="logo">
					<Logo />
				</Icon>
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
			</div>

			<div className="main__header-controls">
				<div className="main__header-screen" onClick={toggleFullScreen}>
					{isFullScreen ? (
						<img src={compress} alt="" />
					) : (
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</div>

				<div className="main__header-logout" onClick={logoutHandler}>
					{/* <span>Выйти</span> */}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="0.8">
							<path
								d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M16 17L21 12L16 7"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M21 12H9"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					</svg>
				</div>
			</div>
		</header>
	);
};

export default Header;
