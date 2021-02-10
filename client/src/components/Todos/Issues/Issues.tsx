import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	SetSortKey,
	SetSortOrder,
	SetVisibilityFilter,
} from '../../../store/ducks/todos/actionCreators';
import { updateTask, fetchDeleteTask } from '../../../store/ducks/todos/actions';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import {
	selectColors,
	selectOrderedIssues,
	selectTargets,
	selectTargetsList,
	selectVisibilityFilter,
} from '../../../store/ducks/todos/selectors';
import Table, { HeaderItemsInterface } from '../../Table';
import Toggle from '../../UI/Toggle';
import IssuesItem from './IssuesItem';

const Issues: React.FC = () => {
	const dispatch = useDispatch();

	const issues = useSelector(selectOrderedIssues);
	const targetsList = useSelector(selectTargetsList);
	const colors = useSelector(selectColors);
	const targets = useSelector(selectTargets);
	const visibilityFilter = useSelector(selectVisibilityFilter);

	const [allIssues, setAllIssues] = useState<boolean>(true);
	const [completedIssues, setCompletedIssues] = useState<boolean>(false);
	const [notCompletedIssues, setNotCompletedIssues] = useState<boolean>(false);
	const [activeIssues, setActiveIssues] = useState<boolean>(false);

	const [headerItems, setHeaderItems] = useState<HeaderItemsInterface[]>([
		{ id: '', name: '', needSort: false, isActive: false },
		{ id: 'name', name: 'Задача', needSort: true, isActive: false },
		{ id: 'priority', name: 'Приоритет', needSort: false, isActive: false },
		{ id: 'target', name: 'Цель', needSort: false, isActive: false },
		{ id: 'expiresIn', name: 'Истекает', needSort: true, isActive: false },
		{ id: 'date', name: 'Создано', needSort: true, isActive: true },
	]);

	useEffect(() => {
		showAll();
	}, []);

	const showAll = () => {
		setAllIssues(true);
		setCompletedIssues(false);
		setNotCompletedIssues(false);
		setActiveIssues(false);

		dispatch(SetVisibilityFilter('all'));
	};

	const showDone = () => {
		setAllIssues(false);
		setCompletedIssues(true);
		setNotCompletedIssues(false);
		setActiveIssues(false);

		dispatch(SetVisibilityFilter('done'));
	};

	const showNotDone = () => {
		setAllIssues(false);
		setCompletedIssues(false);
		setNotCompletedIssues(true);
		setActiveIssues(false);

		dispatch(SetVisibilityFilter('notDone'));
	};

	const showActive = () => {
		setAllIssues(false);
		setCompletedIssues(false);
		setNotCompletedIssues(false);
		setActiveIssues(true);

		dispatch(SetVisibilityFilter('active'));
	};

	const onSort = (id: string, direction: 'asc' | 'desc') => {
		const updatedItems = headerItems.map(i => {
			if (i.id === id) {
				i.isActive = true;
			} else i.isActive = false;
			return i;
		});

		setHeaderItems(updatedItems);
		dispatch(SetSortKey(id));
		dispatch(SetSortOrder(direction));
	};

	const changeTaskHandler = (task: TaskInterface) => {
		dispatch(updateTask(task));
	};

	const deleteTaskHandler = (id: string) => {
		dispatch(fetchDeleteTask(id, true));
	};

	return (
		<div className="issues">
			<div className="issues__panel">
				<Toggle
					type="btn"
					colorPrimary="primary"
					textPrimary="Все"
					flag={allIssues}
					onSwitch={showAll}
				/>
				<Toggle
					type="btn"
					colorPrimary="primary"
					textPrimary="Выполненные"
					flag={completedIssues}
					onSwitch={showDone}
				/>
				<Toggle
					type="btn"
					colorPrimary="primary"
					textPrimary="Невыполненные"
					flag={notCompletedIssues}
					onSwitch={showNotDone}
				/>
				<Toggle
					type="btn"
					colorPrimary="primary"
					textPrimary="Активные"
					flag={activeIssues}
					onSwitch={showActive}
				/>
			</div>
			<Table class="issues" headerItems={headerItems} onHeaderItemClick={onSort}>
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
