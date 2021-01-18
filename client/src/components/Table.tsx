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
				[`${props.class}__table`]: props.class,
			})}
		>
			{props.headerItems && (
				<header
					className={classNames( {
						[`${props.class}__table`]: props.class,
					}, 'table__header',)}
				>
					{props.headerItems.map((item, index) => (
						<div key={index}>{item}</div>
					))}
				</header>
			)}

			<div
				className={classNames('table__body', {
					[`${props.class}__table`]: props.class,
				})}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Table;
