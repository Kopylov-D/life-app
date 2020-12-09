import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../store/ducks/budget/actions';
import { selectCategories, selectCurrentCategory, selectTransactions } from '../../store/ducks/budget/selectors';
import OperationsTable from './OperationsTable';

interface Props {
	// transactions: TransactionInterface[];
	// categories: CategoryInterface[]
	// currentCategory: CategoryInterface
}

const Operations: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);

	const onDeleteTransactionHandler = (id: string) => {
		dispatch(deleteTransaction(id));
	};

	return (
		<div>
			<OperationsTable
				transactions={transactions}
				categories={categories}
				currentCategory={currentCategory}
				onDeleteTransaction={onDeleteTransactionHandler}
			/>
		</div>
	);
};

export default Operations;
