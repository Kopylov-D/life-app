import React from 'react';
import classNames from 'classnames';
import TableHeaderItem from './TableHeaderItem';
import { TargetInterface, TaskInterface } from '../store/ducks/todos/contracts/state';
import {
	TransactionInterface,
	BalanceInterface,
	CategoryInterface,
} from '../store/ducks/budget/contracts/state';

export interface HeaderItemsInterface {
	id:
		| ''
		| keyof TransactionInterface
		| keyof BalanceInterface
		| keyof TaskInterface
		| keyof CategoryInterface
		| keyof TargetInterface;
	name: string;
	needSort: boolean;
	isActive: boolean;
}

type Props = {
	className: string;
	headerItems?: HeaderItemsInterface[];
	onHeaderItemClick?(name: string, direction: string): void;
};

const Table: React.FC<Props> = props => {
	return (
		<div
			className={classNames('table', {
				[`${props.className}__table`]: props.className,
			})}
		>
			{props.headerItems && (
				<header
					className={classNames(
						{
							[`${props.className}__table`]: props.className,
						},
						'table__header'
					)}
				>
					{props.headerItems.map((item, index) => (
						<TableHeaderItem
							key={index}
							{...item}
							onHeaderItemClick={props.onHeaderItemClick}
						/>
					))}
				</header>
			)}

			<div
				className={classNames('table__body', {
					[`${props.className}__table`]: props.className,
				})}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Table;
