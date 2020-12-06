import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../store/ducks/budget/actions';
import { TransactionInterface } from '../../store/ducks/budget/types';
import OperationsTable from './OperationsTable';

interface Props {
	transactions: TransactionInterface[];
}

const Operations: React.FC<Props> = ({ transactions }) => {
	const dispatch = useDispatch();

	const onDeleteTransactionHandler = async (id: string) => {
		dispatch(deleteTransaction(id));
	};
	return (
		<div>
			<OperationsTable
				transactions={transactions}
				onDeleteHandler={onDeleteTransactionHandler}
			/>
		</div>
	);
};

export default Operations;
