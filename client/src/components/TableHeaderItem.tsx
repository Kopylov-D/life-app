import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from './UI/Icons/Icon';
import { ChevronIcon } from './UI/Icons';

interface Props {
	id: string;
	name: string;
	onHeaderItemClick?(name: string, direction: string): void;
	needSort: boolean;
	isActive: boolean;
}

const TableHeaderItem: React.FC<Props> = ({
	id,
	name,
	needSort,
	isActive,
	onHeaderItemClick,
}) => {
	const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

	const onClick = () => {
		if (needSort) {
			let newDirection = direction;
			if (isActive)
				direction === 'asc' ? (newDirection = 'desc') : (newDirection = 'asc');
			setDirection(newDirection);
			onHeaderItemClick!(id, newDirection);
		}
	};

	return (
		<div
			className={classNames('header-item', { 'header-item--active': isActive })}
			onClick={onClick}
		>
			<span>{name}</span>
			{needSort && (
				<div className={classNames('header-item__sort-icons', { active: isActive })}>
					<Icon
						classNames={classNames(
							'arrow',
							{ 'icon--ghost': needSort },
							{ 'icon--hiddenn': isActive },
							{ 'icon__arrow--active': isActive }
						)}
						direction={direction === 'asc' ? 'up' : undefined}
					>
						<ChevronIcon />
					</Icon>
				</div>
			)}
		</div>
	);
};

export default TableHeaderItem;
