import React, { Fragment } from 'react';
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

const Switch: React.FC<Props> = ({
	textPrimary,
	textSecondary,
	colorPrimary,
	colorSecondary,
	flag,
	type = 'switch',
	onSwitch,
}) => {
	let toggle = (
		<div className='toggle__switch'>
			<div
				className={classNames(
					'toggle__switch-item',
					// { active: flag },
					{ [colorPrimary]: flag }
				)}
				onClick={() => onSwitch(true)}
			>
				{textPrimary}
			</div>
			<div
				className={classNames(
					'toggle__switch-item',
					// { active: !flag },
					{ [colorSecondary ? colorSecondary : colorPrimary]: !flag }
				)}
				onClick={() => onSwitch(false)}
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
					{ 'toggle__btn-active': flag },
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

export default Switch;
