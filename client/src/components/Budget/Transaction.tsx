import React from 'react';

import gear from '../../assets/img/gear.svg';
import trash from '../../assets/img/trash.svg';
import { TransactionInterface } from '../../store/ducks/budget/types';

interface Props extends TransactionInterface {
	onChangeTransaction(e: React.MouseEvent, id: string): void;
	onDeleteTransaction(id: string): void;
}

const Transaction: React.FC<Props> = ({
	_id,
	date,
	user,
	amount,
	category,
	onChangeTransaction,
	onDeleteTransaction,
}) => {
	return (
		<div className="table__item">
			
			<div>{date}</div>
			<div>{amount} руб.</div>
			<div>{category.name}</div>

			<div className="options">
				<img src={gear} alt="" onClick={e => onChangeTransaction(e, _id)}></img>
				<img src={trash} alt="" onClick={() => onDeleteTransaction(_id)}></img>
			</div>
		</div>
	);
};

export default Transaction;
