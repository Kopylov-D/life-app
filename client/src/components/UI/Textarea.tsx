import React from 'react';
import classNames from 'classnames';

interface Props {
	value: string;
	classNames?: string;
	onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const Textarea: React.FC<Props> = props => {
	return (
		<textarea
			className={classNames('text-area', {
				[`${props.classNames}__textarea`]: props.classNames,
			})}
			value={props.value}
			onChange={e => props.onChange(e)}
		></textarea>
	);
};

export default Textarea;
