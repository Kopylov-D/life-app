import React, { Fragment, useState } from 'react';
import { formatDate } from '../../../services/utils/dateUtils';
import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import useOutsideClick from '../../../hooks/outsideClick.hook';
// import Checkbox from '../../UI/Checkbox';
import TaskEditor from '../Backlog/TaskEditor';
// import {ReactComponent as Check} from '../../../assets/icons/checkmark-done-outline.svg';
// import { ReactComponent as Edit } from '../../../assets/icons/pencil-outline.svg';
import Icon from '../../UI/Icons/Icon';
import { CheckIcon, PencilIcon } from '../../UI/Icons';

interface Props {
	task: TaskInterface;
	colors: ColorInterface[];
	targets: TargetInterface[];
	targetName?: string;

	changeTaskHandler(task: TaskInterface): void;
	deleteTaskHandler(id: string): void;
}

const IssuesItem: React.FC<Props> = ({
	task,
	colors,
	targets,
	targetName,
	changeTaskHandler,
	deleteTaskHandler,
}) => {
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);
	const [target, setTarget] = useState<string | undefined>(targetName);

	// const onChecked = () => {
	// 	changeTaskHandler({ ...task, isDone: !task.isDone });
	// };

	const onChange = (task: TaskInterface) => {
		changeTaskHandler({ ...task });
		setIsVisible(false);
	};

	return (
		<Fragment>
			{isVisible ? (
				<div ref={ref}>
					<TaskEditor
						{...task}
						cancelEditor={() => setIsVisible(false)}
						type="edit"
						submit={onChange}
						deleteTask={deleteTaskHandler}
						colors={colors}
						targets={targets}
					/>
				</div>
			) : (
				<div className="issues-item table__item">
					{/* <Checkbox checked={task.isDone} id={task._id} onChangeHandler={onChecked} /> */}
					<div className="issues-item__status">
						{task.isDone && <CheckIcon />}
						{/* {task.isDone && <img src={checked} alt="" />} */}
					</div>
					<div className="issues-item__task">{task.name}</div>
					<div className="issues-item__priority">
						{task.priority ? '!'.repeat(4 - task.priority) : '-'}
					</div>
					<div className="issues-item__target">{target ? target : '-'}</div>
					<div className="issues-item__expiresIn">
						{task.expiresIn ? formatDate(task.expiresIn) : '-'}
					</div>
					<div className="issues-item__date">
						{task.date ? formatDate(task.date) : '-'}
					</div>
					<div className="issues-item__options">
						<Icon classNames="edit" onClick={() => setIsVisible(true)}>
							<PencilIcon />
						</Icon>
						{/* <img src={edit} alt=""  /> */}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default IssuesItem;
