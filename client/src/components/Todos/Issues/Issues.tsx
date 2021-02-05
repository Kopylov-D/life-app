import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, fetchDeleteTask } from '../../../store/ducks/todos/actions';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import {
	selectColors,
	selectIssues,
	selectTargets,
	selectTargetsList,
	selectTasks,
} from '../../../store/ducks/todos/selectors';
import Table from '../../Table';
import IssuesItem from './IssuesItem';

interface Props {}

const Issues: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();

	const issues = useSelector(selectIssues);
	const targetsList = useSelector(selectTargetsList);
	const colors = useSelector(selectColors);
	const targets = useSelector(selectTargets);

	const changeTaskHandler = (task: TaskInterface) => {
		dispatch(updateTask(task));
	};

	const deleteTaskHandler = (id: string) => {
		dispatch(fetchDeleteTask(id, true));
	};

	return (
		<div className="issues">
			<Table
				class="issues"
				headerItems={['', 'Задача', 'Приоритет', 'Цель', 'Истекает', 'Создано']}
			>
				{issues.map(item => {
					const targetName = targetsList.find(target => target.id === item.target)?.value;
					return (
						<IssuesItem
							key={item._id}
							task={item}
							targetName={targetName}
							colors={colors}
							targets={targets}
							changeTaskHandler={changeTaskHandler}
							deleteTaskHandler={deleteTaskHandler}
						/>
					);
				})}
			</Table>
		</div>
	);
};

export default Issues;
