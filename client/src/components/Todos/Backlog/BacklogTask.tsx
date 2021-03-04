import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { matchColor } from '../../../services/utils/matchColor';
import useColorName from '../../../hooks/color.hook';
import TaskEditor from './TaskEditor';
import Checkbox from '../../UI/Checkbox';
import Icon from '../../UI/Icons/Icon';
import { PencilIcon } from '../../UI/Icons';

interface Props {
	deleteTaskHandler(id: string): void;
	changeTaskHandler(task: TaskInterface): void;

	colors: ColorInterface[];
	targets: TargetInterface[];
	task: TaskInterface;
}

const BacklogTask: React.FC<Props> = ({
	task,
	targets,
	colors,
	deleteTaskHandler,
	changeTaskHandler,
}) => {
	const [isDone, setIsDone] = useState(task.isDone);
	const { colorName } = useColorName(task.color, colors);
	const [taskEditorIsOpen, setTaskEditorIsOpen] = useState(false);

	const onChecked = () => {
		setIsDone(!isDone);
		setTimeout(
			() => changeTaskHandler({ ...task, isDone: !isDone, inArchive: !task.inArchive, level: 0 }),
			1000
		);
	};

	const onChangeTask = (task: TaskInterface) => {
		changeTaskHandler({ ...task });
		setTaskEditorIsOpen(false);
	};

	return (
		<Fragment>
			{taskEditorIsOpen ? (
				<TaskEditor
					cancelEditor={() => setTaskEditorIsOpen(false)}
					type="edit"
					submit={onChangeTask}
					deleteTask={deleteTaskHandler}
					{...task}
					colors={colors}
					targets={targets}
				/>
			) : (
				<div
					className={classNames('backlog-task', {
						[`${colorName}`]: colorName,
					})}
				>
					<div className="backlog-task__content">
						<Checkbox
							checked={isDone}
							color={matchColor(task.priority)}
							onChangeHandler={onChecked}
						/>
						<div className="backlog-task__name">{task.name}</div>
					</div>

					<div className="options">
						<Icon classNames="edit" onClick={() => setTaskEditorIsOpen(true)}>
							<PencilIcon />
						</Icon>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;
