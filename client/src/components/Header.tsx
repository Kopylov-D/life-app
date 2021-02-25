import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/ducks/auth/actions';
import { ContractIcon, ExpandIcon, LogoIcon, LogoutIcon } from './UI/Icons';
// import compress from '../assets/icons/Compress.svg';

// import { ReactComponent as Logo } from '../assets/icons/logo.svg';
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
					{/* <span>Выйти</span> */}
					{/* <svg
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
					</svg> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
