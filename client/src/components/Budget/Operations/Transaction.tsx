import classNames from 'classnames';
import React from 'react';
import trash from '../../../assets/img/trash.svg';
import { formatDate } from '../../../services/utils/dateUtils';
import { TransactionInterface } from '../../../store/ducks/budget/types';

interface Props extends TransactionInterface {
	onDeleteTransaction(_id: string): void;
}

const Transaction: React.FC<Props> = ({
	_id,
	date,
	amount,
	category,
	isExpense,
	onDeleteTransaction,
}) => {
	return (
		<div className={classNames('table__item', {'color-expense': isExpense}, {'color-income': !isExpense})}>
			<div>{formatDate(date)}</div>
			<div>{amount} руб.</div>
			<div>{category.name}</div>

			<div className="options">
				<img src={trash} alt="" onClick={() => onDeleteTransaction(_id)}></img>
			</div>
		</div>
	);
};

export default Transaction;
