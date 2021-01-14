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

			<div
				className="budget__proportion-bottom"
				style={{ width: proportion.percentIncome + '%' }}
			>
				{proportion.income}
			</div>
		</div>
	);
};

export default Proportion;
