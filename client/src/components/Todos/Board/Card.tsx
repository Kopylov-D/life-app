import React from 'react';
import Button from '../../UI/Button';
import Task from './Task';

interface Props {
  headerName: string

}

const Card: React.FC<any> = props => {
	const onClick = () => {
		console.log('add task click');
	};

	const onTaskCheck = () => {
		console.log('check task');
	};

	const onTaskDelete = () => {
		console.log('task del');
	};

	return (
		<div className="card">
			<header className="card__header">День</header>

			<ul className="card__content">
				<li className="card__content-item">task1</li>
				<li className="card__content-item">task1</li>
				<li className="card__content-item">task1</li>
				<Task
					value="Задача 1"
					id="sffdsf"
					isDone={true}
					onChecked={onTaskCheck}
					onDelete={onTaskDelete}
				/>
			</ul>

			<footer className="card__footer">
				<Button onClick={onClick} size="small">
					Добавить задачу
				</Button>
			</footer>
		</div>
	);
};

export default Card;
