import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import { getTargets, getTasks, updateCard } from '../../../store/ducks/todos/actions';
import { CardInterface } from '../../../store/ducks/todos/contracts/state';
import { selectTasks } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Task from './Task';

interface Props extends CardInterface {
	// headerName: string;
}

const Card: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);
	// const [headerChangerIsOpen, setHeaderChangerIsOpen] = useState<boolean>(flag);
	const headerInput = useInput({ initialValue: props.name });
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

	const onClickHeaderName = () => {
		setIsVisible(true);
	};

	const onChangeCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			dispatch(updateCard(props._id, headerInput.value));

		}
	};

	return (
		<div className="card">
			<div className="card__container">
				<header ref={ref} className="card__header" onClick={onClickHeaderName}>
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
				</header>

				<ul className="card__content">
					{tasks.map(task => {
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
									onChecked={onTaskCheck}
									onDelete={onTaskDelete}
								/>
							);
						}
					})}
				</ul>
			</div>

			<footer className="card__footer">
				<Button onClick={onClick} size="small">
					Добавить задачу
				</Button>
			</footer>
		</div>
	);
};

export default Card;
