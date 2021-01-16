import React from 'react';
import { NavLink } from 'react-router-dom';

type Item = {
	to: string;
	title: string;
	icon?: string;
	component?: any;
};

type Props = {
	items: Item[];
};

const Menu: React.FC<Props> = ({ items }) => {
	return (
		<div className="main__menu">
			<ul>
				{items.map(item => (
					<NavLink key={item.to} to={item.to}>{item.title}</NavLink>
				))}
			</ul>
		</div>
	);
};

export default Menu;

