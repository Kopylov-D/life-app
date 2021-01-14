import React from 'react';

interface Props {
	_id: string;
	name: string;
	amount: number;
}

const TableItem: React.FC<Props> = props => {
	return (
		<div className="table__item table__accounting">
			<div>{props.name}</div>
			<div>{props.amount} руб.</div>
		</div>
	);
};

export default TableItem;
