import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import close from '../../assets/icons/Close.svg';
import refresh from '../../assets/icons/Refresh.svg';
import classNames from 'classnames';
import { syncDataWithout } from '../../store/ducks/todos/actions';
import { hideAlert } from '../../store/ducks/common/actionCreators';
import { selectAlerts } from '../../store/ducks/common/selectors';

const Alert: React.FC = () => {
	const alerts = useSelector(selectAlerts);
	const dispatch = useDispatch();

	const closeAlert = (id: number) => {
		dispatch(hideAlert(id));
	};

	const onAlertClick = (id: number, action: string | undefined) => {
		if (action === 'sync') {
			dispatch(syncDataWithout());
			closeAlert(id)
		}
	};

	if (alerts.length > 0 && alerts !== null) {
		return (
			<div className={classNames('alert')}>
				{alerts.map(alert => (
					<Fragment key={alert.id}>
						<div
							className={classNames('alert__item', {
								[`alert--${alert.type}`]: alert.type,
							})}
						>
							{alert.action && (
								<img
									className="alert__icon"
									src={refresh}
									alt=""
									onClick={() => onAlertClick(alert.id, alert.action)}
								/>
							)}
							<span className="alert__text">{alert.text}</span>
							{!alert.delay && (
								<img
									className="alert__close"
									src={close}
									alt=""
									onClick={() => closeAlert(alert.id)}
								/>
							)}
						</div>
					</Fragment>
				))}
			</div>
		);
	} else return null;
};

export default Alert;
