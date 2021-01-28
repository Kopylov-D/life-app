import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import {
	fetchDeleteCard,
	fetchDeleteTask,
	getTargets,
	getTasks,
	updateCard,
} from '../../../store/ducks/todos/actions';
import { CardInterface, SubtaskInterface, TaskInterface } from '../../../store/ducks/todos/contracts/state';
import { selectCardsNumber, selectTasks } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Task from './Task';
import TaskSelector from './TaskSelector';

interface Props extends CardInterface {
	tasks: TaskInterface[]
	subtasks: SubtaskInterface[]
	// headerName: string;
}

const Card: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [taskSelectorIsOpen, setTaskSelectorIsOpen] = useState(false);

	const { ref, isVisible, setIsVisible } = useOutsideClick(false);
	// const [headerChangerIsOpen, setHeaderChangerIsOpen] = useState<boolean>(flag);
	const headerInput = useInput({ initialValue: props.name });
	const cardsNumber = useSelector(selectCardsNumber);

	const onAddTaskToCard = () => {
		console.log('add task click');
		setTaskSelectorIsOpen(true);
		// dispatch(getTargets());
		// dispatch(getTasks());
	};

	// useEffect(() => {
	// 	React.rend
	// }, [tasks])

	const onTaskCheck = (id: string) => {
		console.log('check task', id);
	};

	const onTaskDelete = (id: string) => {
		dispatch(fetchDeleteTask(id))
	};

	const onCardDelete = () => {
		dispatch(fetchDeleteCard(props._id));
	};

	const onClickHeaderName = () => {
		setIsVisible(true);
	};

	const onChangeCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			dispatch(updateCard(props._id, headerInput.value));
			setIsVisible(false);
		}
	};

	return (
		<div className="card">
			<div className="card__container">
				<header ref={ref} className="card__header">
					<div className="card__title" onClick={onClickHeaderName}>
						{isVisible ? (
							<Input
								onChange={headerInput.onChange}
								type="text"
								valid={headerInput.valid}
								value={headerInput.value}
								touched={headerInput.touched}
								onKeyPress={onChangeCard}
							/>
						) : (
							props.name
						)}
					</div>
					{cardsNumber === props.level && (
						<span className="card__delete material-icons" onClick={onCardDelete}>
							clear
						</span>
					)}
				</header>

				<ul className="card__content">
					{props.tasks.map(task => {
						if (task.level === props.level) {
							return (
								<Task
									key={task._id}
									_id={task._id}
									date={task.date}
									isDone={task.isDone}
									level={task.level}
									name={task.name}
									notes={task.notes}
									subtasks={props.subtasks}
									onChecked={onTaskCheck}
									onDelete={onTaskDelete}
					
								/>
							);
						}
					})}
				</ul>
			</div>

			<footer className="card__footer">
				<Button onClick={onAddTaskToCard} size="small">
					Добавить задачу
				</Button>
			</footer>

			{taskSelectorIsOpen && <TaskSelector close={() => setTaskSelectorIsOpen(false)} tasks={props.tasks} level={props.level}/>}
		</div>
	);
};

export default Card;
