import React from 'react';
import Icon from './Icon';

interface Props {}

const EditFileIcon: React.FC<Props> = props => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 24 24">
			<title>Expand</title>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="24"
				d="M432 320v112H320M421.8 421.77L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320M90.23 421.8L208 304"
			/>
		</svg>
	);
};

export default EditFileIcon;
