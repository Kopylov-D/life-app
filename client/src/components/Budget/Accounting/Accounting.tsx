import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectLoadingStatus,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import { LoadingStatus } from '../../../store/types';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';
import AccountingTable from './AccountingTable';
import Proportion from './Proportion';

const Accounting: React.FC = () => {
	const dispatch = useDispatch();

	const { categories, proportion } = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);
	const loadingStatus = useSelector(selectLoadingStatus);

	useEffect(() => {
		dispatch(getBudgetData());
	}, []);

	const changeDateHandler = (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) => {
		dispatch(getBudgetData(year, month, all, fullYear));
	};

	return (
		<div className="accounting">
			<div className="budget__panel">
				<DatePanel startDate={options.startDate} changeDate={changeDateHandler} />
				<Proportion proportion={proportion} />
			</div>

			{loadingStatus === LoadingStatus.LOADING ? (
				<Loader size="small" type="cube-grid" />
			) : (
				<div className="accounting__tables">
					<AccountingTable categories={categories} isExpense={true} title="Расходы" />
					<AccountingTable categories={categories} isExpense={false} title="Доходы" />
				</div>
			)}
		</div>
	);
};

export default Accounting;
