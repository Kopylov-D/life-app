import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectIsLoading,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import Loader from '../../UI/Loader';
import Panel from '../Panel';
import AccountingTable from './AccountingTable';
import Proportion from './Proportion';

const Accounting: React.FC = () => {
	const dispatch = useDispatch();
	
	const { categories, proportion } = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	// const currentMonth = new Date().getMonth().toString();
	// const [month, setMonth] = useState<string>(currentMonth);
	// const [year, setYear] = useState<number>(new Date().getFullYear());

	// useEffect(() => {
	// dispatch(getBudgetData(year.toString(), month));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [year, month]);

	// const onMonthClickHandler = (id: string) => {
	// 	setMonth(id);
	// };

	const changeBudgetDataHandler = (year: string, month: string) => {
		dispatch(getBudgetData(year, month));
	};

	return (
		<div className="budget__accounting">
			<div className="budget__panel">
				<Panel
					startDate={options.startDate}
					changeBudgetData={changeBudgetDataHandler}
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
