import React from 'react';
import classNames from 'classnames';

type Props = {
  textError: string | null
}

const Error: React.FC<Props> = props => {
	return (
		<div className={classNames('error')}>
				<div>Ошибка!</div>
				<footer>{props.textError}</footer>
		</div>
	);
};

export default Error;
