import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTargets, getTasks } from '../../../store/ducks/todos/actions';
import { selectTasks } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Task from './Task';

interface Props {
	headerName: string;
}

const Card: React.FC<any> = props => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);

	const onClick = () => {
		console.log('add task click');
		dispatch(getTargets());
		dispatch(getTasks());
	};

	const onTaskCheck = (id: string) => {
		console.log('check task', id);
	};

	const onTaskDelete = (id: string) => {
		console.log('task del', id);
	};

	return (
		<div className="card">
			<header className="card__header">День</header>

			<ul className="card__content">
				{tasks.map(task => (
					<Task
						key={task._id}
						_id={task._id}
						date={task.date}
						isDone={task.isDone}
						level={task.level}
						name={task.name}
						notes={task.notes}
						onChecked={onTaskCheck}
						onDelete={onTaskDelete}
					/>
				))}
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
