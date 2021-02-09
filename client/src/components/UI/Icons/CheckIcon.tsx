import React from 'react';

interface Props {}

const CheckIcon: React.FC<Props> = props => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<title>Checkmark Done</title>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
			/>
		</svg>
	);
};

export default CheckIcon;
