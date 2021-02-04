import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import {
	fetchDeleteCard,
	fetchDeleteTask,

	updateCard,
	updateTask,
} from '../../../store/ducks/todos/actions';
import { CardInterface, ColorInterface, SubtaskInterface, TaskInterface } from '../../../store/ducks/todos/contracts/state';
import { selectCardsNumber } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Task from './Task';
import TaskSelector from './TaskSelector';
import close from '../../../assets/icons/Close.svg'

interface Props extends CardInterface {
	tasks: TaskInterface[]
	subtasks: SubtaskInterface[]
	colors: ColorInterface[]
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
		setTaskSelectorIsOpen(true);
		// dispatch(getTargets());
		// dispatch(getTasks());
	};

	// useEffect(() => {
	// 	React.rend
	// }, [tasks])

	const onTaskCheck = (task: TaskInterface) => {
		dispatch(updateTask(task))
	};

	const onTaskDelete = (id: string) => {
		dispatch(fetchDeleteTask(id, ))
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
						<img src={close} alt="" onClick={onCardDelete}/>
					)}
				</header>

				<ul className="card__content">
					{props.tasks.map(task => {
						if (task.level === props.level) {
							return (
								<Task
									// key={task._id}
									// _id={task._id}
									// date={task.date}
									// isDone={task.isDone}
									// level={task.level}
									// name={task.name}
									// notes={task.notes}
									// color={task.color}
									{...task}
									colors={props.colors}
									subtasks={props.subtasks}
									onChecked={onTaskCheck}
									onDelete={onTaskDelete}
									task={task}
					
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
