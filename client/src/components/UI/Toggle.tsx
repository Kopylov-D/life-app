import React from 'react';
import classNames from 'classnames';

type Props = {
	textPrimary?: string;
	textSecondary?: string;
	onSwitch(flag: boolean): void;
	colorPrimary: string;
	colorSecondary?: string;
	flag: boolean;
	type?: 'switch' | 'btn';
};

const Toggle: React.FC<Props> = ({
	textPrimary,
	textSecondary,
	colorPrimary,
	colorSecondary,
	flag,
	type = 'switch',
	onSwitch,
}) => {
	let toggle = (
		<div className="toggle__switch" onClick={() => onSwitch(!flag)}>
			<div
				className={classNames('toggle__switch-item', {
					[colorPrimary]: flag,
					active: flag,
				})}
			>
				{textPrimary}
			</div>
			<div
				className={classNames('toggle__switch-item', {
					[colorSecondary ? colorSecondary : colorPrimary]: !flag,
					active: !flag,
				})}
			>
				{textSecondary}
			</div>
		</div>
	);

	if (type === 'btn') {
		toggle = (
			<div
				className={classNames(
					'toggle__btn',
					{ 'toggle__btn--active': flag },
					{ [colorPrimary]: flag }
				)}
				onClick={() => onSwitch(flag)}
			>
				{textPrimary}
			</div>
		);
	}

	return <div className="toggle">{toggle}</div>;
};

export default Toggle;
