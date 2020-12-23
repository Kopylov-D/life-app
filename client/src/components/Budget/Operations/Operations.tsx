import React, { Fragment, useEffect, useState } from 'react';
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
import YearChanger from '../YearChanger';
import Loader from '../../UI/Loader';

interface Props {}

const Operations: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(getBudgetData(year.toString(), '12'));
	}, [year]);

	return (
		<Fragment>
			<YearChanger
				startDate={options.startDate}
				changeYear={year => setYear(year)}
				year={year}
			/>
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
