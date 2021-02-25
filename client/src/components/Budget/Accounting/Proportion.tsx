import React from 'react';
import { SelectCategoriesWithAmount } from '../../../store/ducks/budget/selectors';

type Props = {
	proportion: SelectCategoriesWithAmount['proportion'];
};

const Proportion: React.FC<Props> = ({ proportion }) => {
	return (
		<div className="proportion">
			<div
				className="proportion-top"
				style={{ width: proportion.percentExpense + '%' }}
			>
				{proportion.expense}
			</div>

			<div
				className="proportion-bottom"
				style={{ width: proportion.percentIncome + '%' }}
			>
				{proportion.income}
			</div>
		</div>
	);
};

export default Proportion;
