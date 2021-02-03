import React from 'react';

interface Props {
	name: string;
	height?: string;
	fill?: string;
}

const Icon: React.FC<Props> = ({ name, height, fill, children }) => {
	return (
		<svg
			width={height}
			height={height}
			// viewBox="0 0 14 14"
			fill={fill || 'none'}
			xmlns="http://www.w3.org/2000/svg"
			className={`icon icon-${name}`}
		>
			{children}
		</svg>
	);
};

export default Icon;
