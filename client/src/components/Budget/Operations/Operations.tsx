import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectCurrentCategory,
	selectIsLoading,
	selectOptions,
	selectTransactions,
} from '../../../store/ducks/budget/selectors';
import OperationsTable from './OperationsTable';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';

interface Props {}

const Operations: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const changeDateHandler = (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) => {
		dispatch(getBudgetData(year, month, all, fullYear));
	};

	return (
		<Fragment>
			<div className="budget__panel">
				<DatePanel
					changeDate={changeDateHandler}
					startDate={options.startDate}
				/>
			</div>
			{isLoading ? (
				<Loader type="cube-grid" />
			) : (
				<div>
					<OperationsTable
						transactions={transactions}
						categories={categories}
						currentCategory={currentCategory}
					/>
				</div>
			)}
		</Fragment>
	);
};

export default Operations;
