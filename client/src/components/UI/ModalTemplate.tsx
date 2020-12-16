import React from 'react';

type Props = {
	title?: string;
};

const ModalTemplate: React.FC<Props> = props => {
	return (
		// <div className="Modal">
		<div className="Modal">
			<div className="Modal__content">
				{props.title && <div className="Modal__title">{props.title}</div>}
				<div className="Modal__body">{props.children}</div>
			</div>
		</div>
		// </div>
	);
};

export default ModalTemplate;
