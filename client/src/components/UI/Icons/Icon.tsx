import classNames from 'classnames';
import React from 'react';

interface Props {
	name: string;
	onClick?(e: React.MouseEvent):void
}

const Icon: React.FC<Props> = (props) => {
	return (
		<div className={classNames('icon', `icon__${props.name}`)} onClick={props.onClick}>
			{props.children}
		</div>
	);
};

// const Icon: React.FC<Props> = ({ name, height, fill, children }) => {
// 	return (
// 		<svg
// 			width={height}
// 			height={height}
// 			// viewBox="0 0 14 14"
// 			fill={fill || 'none'}
// 			xmlns="http://www.w3.org/2000/svg" , `icon__${props.name}`
// 			className={`icon icon-${name}`}
// 		>
// 			{children}
// 		</svg>
// 	);
// };

export default Icon;
