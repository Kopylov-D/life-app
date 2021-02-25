import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { setColor } from '../../../services/utils/commonUtils';
import useOutsideClick from '../../../hooks/outsideClick.hook';
import useColorName from '../../../hooks/color.hook';
import TaskEditor from './TaskEditor';
import Checkbox from '../../UI/Checkbox';
import Icon from '../../UI/Icons/Icon';
import { PencilIcon } from '../../UI/Icons';
import { isDOMComponent } from 'react-dom/test-utils';

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
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	const onChecked = () => {
		setIsDone(!isDone)
		setTimeout(
			() =>
				changeTaskHandler({ ...task, isDone: !isDone, inArchive: !task.inArchive }),
			1000
		);
	};

	const onChangeTask = (task: TaskInterface) => {
		changeTaskHandler({ ...task });
		setIsVisible(false);
	};

	return (
		<Fragment>
			{isVisible ? (
				// <div ref={ref}>
				<TaskEditor
					cancelEditor={() => setIsVisible(false)}
					type="edit"
					submit={onChangeTask}
					deleteTask={deleteTaskHandler}
					{...task}
					colors={colors}
					targets={targets}
				/>
			) : (
				// </div>
				<div
					className={classNames('backlog-task', {
						[`${colorName}`]: colorName,
					})}
				>
					<div className="backlog-task__content">
						<Checkbox
							checked={isDone}
							color={setColor(task.priority)}
							onChangeHandler={onChecked}
						/>
						<div className="backlog-task__name">{task.name}</div>
					</div>

					<div className="options">
						<Icon classNames="edit" onClick={() => setIsVisible(true)}>
							<PencilIcon />
						</Icon>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;
