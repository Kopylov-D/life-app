import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../types';
import Icon from './UI/Icons/Icon';
import { icons } from './UI/Icons';

type Props = {
	items: MenuItem[];
	isOpen?: boolean;
};

const Menu: React.FC<Props> = ({ items, isOpen = true }) => {
	const [display, setDisplay] = useState<'none' | 'block'>();

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
							<div className="menu__left-group">
								<div className="menu__icon">
									{IconComponent && (
										<Icon classNames={item.icon!}>
											<IconComponent />
										</Icon>
									)}
								</div>
								<div className="menu__title">{item.title}</div>
							</div>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Menu;
