import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { syncData } from '../../store/ducks/todos/actions';
import { hideAlert } from '../../store/ducks/common/actionCreators';
import { selectAlerts } from '../../store/ducks/common/selectors';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CloseIcon, RefreshIcon } from './Icons';
import Icon from './Icons/Icon';

const Alert: React.FC = () => {
  const alerts = useSelector(selectAlerts);
  const dispatch = useDispatch();

  const closeAlert = (id: number) => {
    dispatch(hideAlert(id));
  };

  const onAlertClick = (id: number, action: string | undefined) => {
    if (action === 'sync') {
      dispatch(syncData());
      closeAlert(id);
    }
  };

  return (
    <TransitionGroup className="alert">
      {alerts.map(alert => (
        <CSSTransition timeout={200} classNames="alert__item" key={alert.id}>
          <div
            className={classNames('alert__item', {
              [`alert--${alert.type}`]: alert.type,
            })}
          >
            {alert.action && (
              <Icon
                classNames="refresh alert__icon"
                onClick={() => onAlertClick(alert.id, alert.action)}
              >
                <RefreshIcon />
              </Icon>
            )}
            <span className="alert__text">{alert.text}</span>
            {!alert.delay && (
              <Icon classNames="refresh" onClick={() => closeAlert(alert.id)}>
                <CloseIcon />
              </Icon>
            )}
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Alert;
