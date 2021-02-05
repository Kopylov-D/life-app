import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import edit from '../../../assets/icons/Pencil.svg';
import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import TaskEditor from './TaskEditor';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import useColorName from '../../../hooks/color.hook';

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
	// const [isDoneTask, setIsDoneTask] = useState<boolean>(task.isDone);
	const { colorName } = useColorName(task.color, colors);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	const onChecked = () => {
		// setIsDoneTask(!isDoneTask);
		changeTaskHandler({ ...task, isDone: !task.isDone, inArchive: !task.inArchive });
	};

	const onChangeTask = (task: TaskInterface) => {
		changeTaskHandler({ ...task });
		setIsVisible(false);
	};

	return (
		<Fragment>
			{isVisible ? (
				<div ref={ref}>
					<TaskEditor
						cancelEditor={() => setIsVisible(false)}
						type="edit"
						submit={onChangeTask}
						deleteTask={deleteTaskHandler}
						{...task}
						colors={colors}
						targets={targets}
					/>
				</div>
			) : (
				<div
					className={classNames('backlog-task', {
						[`${colorName}`]: colorName,
					})}
				>
					<div className="backlog-task__content">
						<Checkbox checked={task.isDone} id={task._id} onChangeHandler={onChecked} />
						<div>{task.name}</div>
					</div>

					<div className="options">
						<img src={edit} alt="" onClick={() => setIsVisible(true)}></img>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;
