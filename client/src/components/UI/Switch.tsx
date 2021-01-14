import React, { Fragment } from 'react';
import classNames from 'classnames';

type Props = {
	textLeft?: string;
	textRight?: string;
	onSwitch(flag: boolean): void;
	colorLeft: string;
	colorRight?: string;
	flag: boolean;
	type?: 'switch' | 'btn';
};

const Switch: React.FC<Props> = ({
	textLeft,
	textRight,
	colorLeft,
	colorRight,
	flag,
	type = 'switch',
	onSwitch,
}) => {
	let toggle = (
		<Fragment>
			<div
				className={classNames(
					'toggle__switch',
					// { active: flag },
					{ [colorLeft]: flag }
				)}
				onClick={() => onSwitch(true)}
			>
				{textLeft}
			</div>
			<div
				className={classNames(
					'toggle__switch',
					// { active: !flag },
					{ [colorRight ? colorRight : colorLeft]: !flag }
				)}
				onClick={() => onSwitch(false)}
			>
				{textRight}
			</div>
		</Fragment>
	);

	if (type === 'btn') {
		toggle = (
			<div
				className={classNames(
					'toggle__btn',
					{ 'toggle__btn-active': flag },
					{ [colorRight ? colorRight : colorLeft]: !flag }
				)}
				onClick={() => onSwitch(false)}
			>
				{textRight}
			</div>
		);
	}

	return <div className="toggle">{toggle}</div>;
};

export default Switch;
