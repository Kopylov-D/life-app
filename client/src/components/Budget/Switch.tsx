import React from 'react';
import classNames from 'classnames';

type Props = {
	textLeft?: string;
	textRight?: string;
	onSwitch(flag: boolean): void;
	colorLeft: string;
	colorRight?: string;
	flag: boolean;
};

const Switch: React.FC<Props> = ({
	textLeft,
	textRight,
	colorLeft,
	colorRight,
	flag,
	onSwitch,
}) => (
	<div className="switch">
		<div
			className={classNames(
				'switch__toggle',
				{ active: flag },
				{ [colorLeft]: flag }
			)}
			onClick={() => onSwitch(true)}
		>
			{textLeft}
		</div>
		<div
			className={classNames(
				'switch__toggle',
				{ active: !flag },
				{ [colorRight ? colorRight : colorLeft]: !flag }
			)}
			onClick={() => onSwitch(false)}
		>
			{textRight}
		</div>
	</div>
);

export default Switch;
