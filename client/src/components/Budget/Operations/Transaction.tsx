import classNames from 'classnames';
import React from 'react';
import { formatDate } from '../../../services/utils/dateUtils';
import { TransactionInterface } from '../../../store/ducks/budget/contracts/state';
import { TrashIcon } from '../../UI/Icons';
import Icon from '../../UI/Icons/Icon';

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
		<div
			className={classNames(
				'table__item',
				{ 'color-expense': isExpense },
				{ 'color-income': !isExpense }
			)}
		>
			<div>{formatDate(date)}</div>
			<div>{amount} руб.</div>
			<div>{category.name}</div>

			<div className="table__options">
				<Icon classNames="trash" onClick={() => onDeleteTransaction(_id)}>
					<TrashIcon />
				</Icon>
			</div>
		</div>
	);
};

export default Transaction;
