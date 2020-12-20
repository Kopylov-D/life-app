import React from 'react';
import { SelectCategoriesWithAmount } from '../../../store/ducks/budget/selectors';

type Props = {
	proportion: SelectCategoriesWithAmount['proportion'];
};

const Proportion: React.FC<Props> = ({ proportion }) => {
	return (
		<div className="budget__proportion">
			<div
				className="budget__proportion-top"
				style={{ width: proportion.percentExpense + '%' }}
			>
				{proportion.expense}
			</div>
			{/* <span>{proportion.expense}</span> */}
			<div
				className="budget__proportion-bottom"
				style={{ width: proportion.percentIncome + '%' }}
			>
				{proportion.income}
			</div>
			{/* <span>{proportion.expense}</span> */}
		</div>
	);
};

export default Proportion;
