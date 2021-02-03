import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert, selectAlerts } from '../../store/middleaware/alert.middleware';
import close from '../../assets/icons/Close.svg';

interface Props {}

const Alert: React.FC<Props> = props => {
	const alerts = useSelector(selectAlerts);
	const dispatch = useDispatch();

	const closeAlert = (id: number) => {
		dispatch(hideAlert(id));
  };
  
  const onAlert = () => {

  }

	if (alerts.length > 0 && alerts !== null) {
		return (
			<div className="alert">
				{alerts.map(alert => (
					<Fragment>
						<div key={alert.id} className="alert__item">
							{alert.icon && alert.icon}
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
