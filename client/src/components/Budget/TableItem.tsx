import React from 'react';
import gear from '../../assets/img/gear.svg';
import trash from '../../assets/img/trash.svg';

interface Props {
	_id: string;
	name: string;
	amount: number;
	onChangeCategory(e: React.MouseEvent, id: string): void;
	onDeleteCategory(id: string): void;
}

const TableItem: React.FC<Props> = props => {
	return (
		<div className="table__item">
			<div>{props.name}</div>
			<div>{props.amount} руб.</div>
			<div className="options">
				<img
					src={gear}
					alt=""
					onClick={e => props.onChangeCategory(e, props._id)}
				></img>
				<img
					src={trash}
					alt=""
					onClick={() => props.onDeleteCategory(props._id)}
				></img>
			</div>
		</div>
	);
};

export default TableItem;
