import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icons, MenuItem } from '../types';

// import { ReactComponent as BoardIcon } from '../assets/icons/clipboard-outline.svg';
// import { ReactComponent as BacklogIcon } from '../assets/icons/file-tray-stacked-outline.svg';
// import { ReactComponent as IssuesIcon } from '../assets/icons/albums-outline.svg';
import Icon from './UI/Icons/Icon';
import { icons } from './UI/Icons';

type Props = {
	items: MenuItem[];
	isOpen?: boolean;
};

// const icons = [
// 	{ name: Icons.board, component: BoardIcon },
// 	{ name: Icons.backlog, component: BacklogIcon },
// 	{ name: Icons.issues, component: IssuesIcon },
// ];

const Menu: React.FC<Props> = ({ items, isOpen = true }) => {
	const [display, setDisplay] = useState<'none' | 'block'>();

	console.log(items);

	useEffect(() => {
		isOpen ? setDisplay('block') : setDisplay('none');
	}, [isOpen]);

	return (
		<div className="menu" style={{ display }}>
			<ul>
				{items.map(item => {
					const IconComponent = icons.find(icon => icon.name === item.icon)?.component;

					return (
						<NavLink key={item.to} to={item.to}>
							<div className="menu__icon">
								{IconComponent && (
									<Icon name={item.title}>
										<IconComponent />
									</Icon>
								)}
							</div>
							<div className="menu__title">{item.title}</div>
							<div className="menu__bage">3</div>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Menu;
