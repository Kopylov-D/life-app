import React from 'react';
import { SettingsIcon, TrashIcon } from '../../UI/Icons';
import Icon from '../../UI/Icons/Icon';

interface Props {
	_id: string;
	name: string;
	amount: number;
	onChangeCategory(e: React.MouseEvent, id: string): void;
	onDeleteCategory(id: string): void;
}

const CategoryItem: React.FC<Props> = props => {
	return (
		<div className="table__item table__budget-categories-item">
			<div>{props.name}</div>
			<div className="table__options">
				<Icon classNames="settings" onClick={e => props.onChangeCategory(e, props._id)}>
					<SettingsIcon />
				</Icon>
				<Icon classNames="trash" onClick={() => props.onDeleteCategory(props._id)}>
					<TrashIcon />
				</Icon>
			</div>
		</div>
	);
};

export default CategoryItem;
