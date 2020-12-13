import React from 'react';
import TableItem from './TableItem';
import { CategoryInterface } from '../../store/ducks/budget/types';

type Props = {
	isExpense: boolean;
	categories: CategoryInterface[];
};

const Table: React.FC<Props> = ({ categories, isExpense }) => {
	return (
		<div className="table table__accounting">
			<header className="table__header table__accounting">
				<div>Категория</div>
				<div>Сумма</div>
			</header>

			<div className="table__body">
				{categories.map(item => {
					if (isExpense === item.isExpense) {
						return (
							<TableItem
								key={item._id}
								_id={item._id}
								name={item.name}
								amount={item.amount}
							/>
						);
					} else return null;
				})}
			</div>
		</div>
	);
};

export default Table;
