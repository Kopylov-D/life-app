import React, { Fragment } from 'react';
import Backdrop from './Backdrop';

type Props = {
	title?: string;
	backdropType?: string;
	closeModal(): void;
};

const Modal: React.FC<Props> = props => {
	return (
		<Fragment>
			<div className="modal">
				{props.title && <div className="modal__title">{props.title}</div>}
				<div className="modal__body">{props.children}</div>
			</div>

			<Backdrop onClick={props.closeModal} type={props.backdropType} />
		</Fragment>
	);
};

export default Modal;
