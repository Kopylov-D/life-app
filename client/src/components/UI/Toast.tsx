import React from 'react';
import ReactDOM from 'react-dom';
import { CoordinatesInterface } from '../../types';
import Backdrop from './Backdrop';
import Button from './Button';

type Props = {
  text: string | null;
  coords?: CoordinatesInterface;
  textSbmt?: string;
  textClc?: string;
  selfRef?: React.RefObject<HTMLDivElement>;
  submitHandler(): void;
  cancelHandler(): void;
};

const Toast: React.FC<Props> = props => {
  let style = {
    transform: 'translate(-50%, 0)',
    left: 50 + '%',
    top: 30 + '%',
  };

  if (props.coords) {
    style = {
      transform: 'translate(0, 0)',
      left: props.coords.left + 'px',
      top: props.coords.top + 'px',
    };
  }

  return ReactDOM.createPortal(
    <div className="toast" style={style} ref={props.selfRef && props.selfRef}>
      <div className="toast__body">{props.text}</div>
      <div className="toast__footer">
        <Button onClick={props.submitHandler} color="danger" size="small">
          {props.textSbmt ? props.textSbmt : 'Подтвердить'}
        </Button>
        <Button onClick={props.cancelHandler} color="secondary" size="small">
          {props.textClc ? props.textClc : 'Отмена'}
        </Button>
      </div>
      <Backdrop onClick={props.cancelHandler} type="transparent" />
    </div>,
    document.body
  );
};

export default Toast;
