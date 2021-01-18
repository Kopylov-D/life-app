import classNames from 'classnames';
import React, { Fragment } from 'react';
import Backdrop from './Backdrop';

type Props = {
	title?: string;
	class?: string;
	backdropType?: string;
	closeModal(): void;
};

const Modal: React.FC<Props> = props => {
	return (
		<Fragment>
			<div
				className={classNames('modal', {
					[`${props.class}__modal`]: props.class,
				})}
			>
				{props.title && <div className="modal__title">{props.title}</div>}
				<div className="modal__body">{props.children}</div>
			</div>

			<Backdrop onClick={props.closeModal} type={props.backdropType} />
		</Fragment>
	);
};

export default Modal;
