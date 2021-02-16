import classNames from 'classnames';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BackdropInterface } from '../../types';
import Backdrop from './Backdrop';

interface Props {
	title?: string;
	class?: string;
	backdropType?: BackdropInterface['type'];
	closeModal(): void;
}

const Modal: React.FC<Props> = props => {
	return ReactDOM.createPortal(
		<Fragment>
			<div
				className={classNames('modal', {
					[`${props.class}__modal`]: props.class,
				})}
			>
				{props.title && <div className="modal__title">{props.title}</div>}
				{props.children}
			</div>

			<Backdrop onClick={props.closeModal} type={props.backdropType} />
		</Fragment>,
		document.body
	);
};

export default Modal;

// const Modal =({ message, isOpen, onClose, children })=> {
//   if (!isOpen) return null;
//   return ReactDOM.createPortal(
//      <div className="modal">
//       <span>{message}</span>
//       <button onClick={onClose}>Close</button>
//      </div>
//     ,document.body);
//   }
