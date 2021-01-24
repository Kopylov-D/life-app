import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';
import { formatDate } from '../../../services/utils/dateUtils';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import TaskChanger from './TaskChanger';
import { useSelector } from 'react-redux';
import { selectTargetsList, selectTasksList } from '../../../store/ducks/todos/selectors';
import { todosApi } from '../../../services/api/todosApi';

interface Props extends TaskInterface {
	deleteTask(id: string): void;
	changeTask(id: string): void;
}

const BacklogTask: React.FC<Props> = props => {
	const [changerIsOpen, setChangerIsOpen] = useState<boolean>(false);
	const targetsList = useSelector(selectTargetsList);

	const onDelete = () => {};

	// const onChange = () => {
	// 	setChangerIsOpen(true);
	// };

	const onChangeTask = async (name: any, target?: any, notes?: any) => {
		// props.changeTask(props._id)
		await todosApi.updateTask(props._id, name, target, notes);
		setChangerIsOpen(false);

	};

	

	return (
		<Fragment>
			<div
				className={classNames('table__item task__table', {
					[`${props.color}`]: props.color,
				})}
			>
				<div>{formatDate(props.date)}</div>
				<div>{props.name}</div>
				<div>{props.priority}</div>

				<div className="options">
					<img src={gear} alt="" onClick={() => setChangerIsOpen(true)}></img>
					<img src={trash} alt="" onClick={onDelete}></img>
				</div>
			</div>

			{changerIsOpen && (
				<TaskChanger
					close={() => setChangerIsOpen(false)}
					submitChanges={onChangeTask}
					name={props.name}
					selectItems={targetsList}
					notes={props.notes}
					priority={props.priority}
					parentTarget={props.target}
				/>
			)}
		</Fragment>
	);
};

export default BacklogTask;
