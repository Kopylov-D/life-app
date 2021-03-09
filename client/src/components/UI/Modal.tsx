import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { BackdropInterface } from '../../types';
import Backdrop from './Backdrop';

interface Props {
  title?: string;
  class?: string;
  backdropType?: BackdropInterface['type'];
  closeModal(): void;
}

const Modal: React.FC<Props> = props => {
  const [flag, setflag] = useState(false);

  useEffect(() => {
    setflag(true);

    return () => {
      setflag(false);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={classNames('modal', {
        [`${props.class}__modal`]: props.class,
      })}
    >
      {props.title && <div className="modal__title">{props.title}</div>}
      {props.children}
      <CSSTransition
        in={flag}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="backdrop"
      >
        <Backdrop onClick={props.closeModal} type={props.backdropType} />
      </CSSTransition>
    </div>,
    document.body
  );
};

export default Modal;
