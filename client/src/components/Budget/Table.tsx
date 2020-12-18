import React from 'react';
import classNames from 'classnames';

type Props = {
	class: string;
	headerItems?: string[];
};

const Table: React.FC<Props> = props => {
	return (
		<div
			className={classNames('table', {
				[`table__${props.class}`]: props.class,
			})}
		>
			{props.headerItems && (
				<header
					className={classNames('table__header', {
						[`table__${props.class}`]: props.class,
					})}
				>
					{props.headerItems.map((item, index) => (
						<div key={index}>{item}</div>
					))}
				</header>
			)}

			<div
				className={classNames('table__body', {
					[`table__${props.class}`]: props.class,
				})}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Table;
