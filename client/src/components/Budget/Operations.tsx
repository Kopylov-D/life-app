import React from 'react';
import { TransactionInterface } from '../../store/ducks/budget/types';
import OperationsTable from './OperationsTable';

interface Props {
	transactions: TransactionInterface[];
}

const Operations: React.FC<Props> = ({ transactions }) => {
	return (
		<div>
			<OperationsTable transactions={transactions} />
		</div>
	);
};

export default Operations;
