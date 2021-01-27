import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasksToCard } from '../../../store/ducks/todos/actions';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

interface Props {
	tasks: TaskInterface[];
	level: number;
	close(): void;
}

const TaskSelector: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

	const addTaskToList = (id: string) => {
		if (selectedTasks.includes(id)) {
			const tasks = selectedTasks.filter(item => item !== id);
			setSelectedTasks(tasks);
		} else {
			setSelectedTasks(tasks => [...tasks, id]);
		}
	};

	const addSelectedTaskToBoard = () => {
		dispatch(addTasksToCard(selectedTasks, props.level));
	};

	return (
		<Modal class="task-selector" closeModal={props.close}>
			{props.tasks.map(task => {
				if (!task.subtask) {
					return (
						<div key={task._id}>
							<div className="" onClick={() => addTaskToList(task._id)}>
								{task.name}
							</div>
						</div>
					);
				}
			})}
			<Button onClick={addSelectedTaskToBoard}></Button>
		</Modal>
	);
};

export default TaskSelector;
