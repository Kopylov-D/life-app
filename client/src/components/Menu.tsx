import React from 'react';
import { NavLink } from 'react-router-dom';
import Expense from './Budget/Expense';

// type Props = {
// 	width: number;
// };

const Menu: React.FC<any> = props => {
	return (
		<div className="main__menu">
			<ul>
				<NavLink to='/budget/expense'>Расходы</NavLink>
				<NavLink to='/budget/income'>Доходы</NavLink>
			</ul>
		</div>
	);
};

export default Menu;

// style={{width: `${props.width}%`}