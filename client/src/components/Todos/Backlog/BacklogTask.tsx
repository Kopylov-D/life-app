import classNames from 'classnames';
import React, { Fragment } from 'react';
import { ReactComponent as Edit } from '../../../assets/icons/pencil-outline.svg';
import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import TaskEditor from './TaskEditor';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import useColorName from '../../../hooks/color.hook';
import Icon from '../../UI/Icons/Icon';
import { setColor } from '../../../services/utils/commonUtils';

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
	const { colorName } = useColorName(task.color, colors);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	const onChecked = () => {
		changeTaskHandler({ ...task, isDone: !task.isDone, inArchive: !task.inArchive });
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
							checked={task.isDone}
							color={setColor(task.priority)}
							onChangeHandler={onChecked}
						/>
						<div className="backlog-task__name">{task.name}</div>
					</div>

					<div className="options">
						<Icon name="edit" onClick={() => setIsVisible(true)}>
							<Edit />
						</Icon>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;
