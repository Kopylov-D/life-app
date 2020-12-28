import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectIsLoading,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';
import AccountingTable from './AccountingTable';
import Proportion from './Proportion';

const Accounting: React.FC = () => {
	const dispatch = useDispatch();
	
	const { categories, proportion } = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const changeDateHandler = (year: string, month: string, all: boolean) => {
		dispatch(getBudgetData(year, month, all));
	};

	return (
		<div className="budget__accounting">
			<div className="budget__panel">
				<DatePanel
					startDate={options.startDate}
					changeDate={changeDateHandler}
				/>
				<Proportion proportion={proportion} />
			</div>

			{isLoading ? (
				<Loader size="small" type="cube-grid" />
			) : (
				<div className="budget__tables">
					<AccountingTable
						categories={categories}
						isExpense={true}
						title="Расходы"
					/>
					<AccountingTable
						categories={categories}
						isExpense={false}
						title="Доходы"
					/>
				</div>
			)}
		</div>
	);
};

export default Accounting;
