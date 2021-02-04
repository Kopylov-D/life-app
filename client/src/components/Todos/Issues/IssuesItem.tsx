import React from 'react';

interface Props {}

const IssuesItem: React.FC<Props> = props => {
	return (
		<div className="issues-item table__item">
			<div className="issues-item__status"></div>
			<div className="issues-item__task"></div>
			<div className="issues-item__priority"></div>
			<div className="issues-item__date"></div>
		</div>
	);
};

export default IssuesItem;
