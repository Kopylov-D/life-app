import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import useOutsideClick from '../../../hooks/outsideClick.hook';
import {
	fetchDeleteCard,
	fetchDeleteTask,
	updateCard,
	updateTask,
} from '../../../store/ducks/todos/actions';
import {
	CardInterface,
	ColorInterface,
	SubtaskInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { selectCardsNumber } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Task from './Task';
import TaskSelector from './TaskSelector';
// import close from '../../../assets/icons/Close.svg';
// import Tooltip from '../../UI/Tooltip';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Icon from '../../UI/Icons/Icon';
import { CloseIcon } from '../../UI/Icons';

interface Props extends CardInterface {
	tasks: TaskInterface[];
	subtasks: SubtaskInterface[];
	colors: ColorInterface[];
}

const Card: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const cardsNumber = useSelector(selectCardsNumber);

	const [taskSelectorIsOpen, setTaskSelectorIsOpen] = useState(false);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);
	const headerInput = useInput({ initialValue: props.name });

	const onAddTaskToCard = () => {
		setTaskSelectorIsOpen(true);
	};

	const onTaskCheck = (task: TaskInterface) => {
		dispatch(updateTask(task));
	};

	const onTaskDelete = (id: string) => {
		dispatch(fetchDeleteTask(id));
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
						<Icon classNames="close" onClick={onCardDelete}>
							<CloseIcon />
						</Icon>
					)}
				</header>

				{/* <ul className="card__content"> */}
				<TransitionGroup className="card__content">
					{props.tasks.map(task => {
						if (task.level === props.level) {
							return (
								// <Tooltip text={task.name}>
								<CSSTransition
									key={task._id}
									timeout={300}
									classNames="task"
									unmountOnExit
								>
									<Task
										// key={task._id}
										{...task}
										colors={props.colors}
										subtasks={props.subtasks}
										onChecked={onTaskCheck}
										onDelete={onTaskDelete}
										task={task}
									/>
								</CSSTransition>

								// </Tooltip>
							);
						}
					})}
				</TransitionGroup>

				{/* </ul> */}
			</div>

			<footer className="card__footer">
				<Button onClick={onAddTaskToCard} size="small">
					Добавить задачу
				</Button>
			</footer>

			{taskSelectorIsOpen && (
				<TaskSelector
					close={() => setTaskSelectorIsOpen(false)}
					tasks={props.tasks}
					level={props.level}
				/>
			)}
		</div>
	);
};

export default Card;
