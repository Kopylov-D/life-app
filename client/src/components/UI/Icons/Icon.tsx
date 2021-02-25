import classNames from 'classnames';
import React from 'react';

interface Props {
	classNames: string;
	direction?: 'left' | 'right' | 'up';
	onClick?(e: React.MouseEvent): void;
}

const Icon: React.FC<Props> = props => {
	return (
		<div
			className={classNames('icon', `icon__${props.classNames}`, {
				[`icon--${props.direction}`]: props.direction,
			})}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export default Icon;
