import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  onClick(): void;
  type?: 'black' | 'transparent';
}

const Backdrop: React.FC<Props> = ({ type = 'transparent', onClick }) => {
  return ReactDOM.createPortal(
    <div
      className={classNames('backdrop', { [`backdrop-${type}`]: type })}
      onClick={onClick}
    ></div>,
    document.body
  );
};

export default Backdrop;
