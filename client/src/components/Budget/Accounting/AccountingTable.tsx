import React from 'react';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import Table from '../../Table';

type Props = {
	categories: CategoryInterface[];
	isExpense: boolean;
	title?: string;
};

const AccountingTable: React.FC<Props> = ({ categories, isExpense, title }) => {
	return (
		<div>
			<div className='accounting__table-header'>{title}</div>
			<Table class="accounting" headerItems={['Категория', 'Сумма']}>
				{categories.map(item => {
					if (item.isExpense === isExpense) {
						return (
							<div className="table__item accounting__table" key={item._id}>
								<div>{item.name}</div>
								<div>{item.amount} руб.</div>
							</div>
						);
					} else return null;
				})}
			</Table>
		</div>
	);
};

export default AccountingTable;
