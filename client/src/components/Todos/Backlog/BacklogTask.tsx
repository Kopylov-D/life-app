import classNames from 'classnames';
import React from 'react';
import { formatDate } from '../../../services/utils/dateUtils';

interface Props {}

const BacklogTask: React.FC<Props> = props => {
	return (
		<div
			className={classNames(
				'table__item',
				// { 'color-expense': isExpense },
				// { 'color-income': !isExpense }
			)}
		>
			{/* <div>{formatDate(props.date)}</div>
			<div>{amount} руб.</div>
			<div>{category.name}</div> */}

			{/* <div className="options">
				<img src={trash} alt="" onClick={() => onDeleteTransaction(_id)}></img>
			</div> */}
		</div>
	);
};

export default BacklogTask;
