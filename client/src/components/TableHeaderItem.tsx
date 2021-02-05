import React, { useState } from 'react';
import classNames from 'classnames';
import arrow from '../assets/icons/Arrow-down.svg';

interface Props {
	name: string;
	onHeaderItemClick?(direction: string): void;
}

const TableHeaderItem: React.FC<Props> = ({ name, onHeaderItemClick }) => {
	const [hasSort, setHasSort] = useState<boolean>(!!onHeaderItemClick);
	const [isActive, setIsActive] = useState<boolean>(!!onHeaderItemClick);
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

	const onClick = () => {
		if (hasSort) {
			onHeaderItemClick!(direction);
			direction === 'asc' ? setDirection('desc') : setDirection('asc');
		}
	};

	return (
		<div className={classNames('table__header-item', { active: isActive })} onClick={onClick}>
			<span>{name}</span>
			{hasSort && (
				<img
					className={classNames('arrow', { 'arrow-down': direction === 'desc' })}
					src={arrow}
					alt=""
				/>
			)}
		</div>
	);
};

export default TableHeaderItem;
