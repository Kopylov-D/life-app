import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import gear from '../../../assets/img/gear.svg';
import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { useDispatch, useSelector } from 'react-redux';
import { selectTargetsList, selectTasksList } from '../../../store/ducks/todos/selectors';
import Checkbox from '../../UI/Checkbox';
import TaskEditor from './TaskEditor';
import useOutsideClick from '../../../hooks/outsideAlert.hook';
import useColorName from '../../../hooks/color.hook';

interface Props extends TaskInterface {
	deleteTask(id: string): void;
	changeTask(task: TaskInterface): void;

	colors: ColorInterface[];
	targets: TargetInterface[]
	task: TaskInterface;
}

const BacklogTask: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const [isDoneTask, setIsDoneTask] = useState<boolean>(props.isDone);
	// const [color, setColor] = useState<string | undefined>(props.color);
	const {colorName} = useColorName(props.color, props.colors);

	const [changerIsOpen, setChangerIsOpen] = useState<boolean>(false);
	const targetsList = useSelector(selectTargetsList);

	const [taskEditorIsOpen, setTaskEditorIsOpen] = useState<boolean>(false);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	// useEffect(() => {
	// 	const color = props.colors.find(color => color._id === props.color)?.name
	// 	color && setColor(color)
	// }, [props.color])

	const onChecked = () => {
		setIsDoneTask(!isDoneTask);
		props.changeTask({ ...props.task, isDone: !isDoneTask });
	};

	const onChangeTask = (task: TaskInterface) => {
		props.changeTask({ ...task, isDone: isDoneTask });
		setIsVisible(false);
	};

	return (
		<Fragment>
			{isVisible ? (
				<div ref={ref}>
					<TaskEditor
						_id={props._id}
						cancelEditor={() => setIsVisible(false)}
						type="edit"
						submit={onChangeTask}
						deleteTask={props.deleteTask}
						name={props.name}
						target={props.target}
						subtask={props.subtask}
						task={props.task}
						color={props.color}
						colors={props.colors}
						targets={props.targets}
					/>
				</div>
			) : (
				<div
					className={classNames('backlog-task', 
					{
						[`${colorName}`]: colorName,
					}
					// color
					)}
				>
					<div className="backlog-task__content">
						<Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} />
						<div>{props.name}</div>
					</div>

					<div className="options">
						<img src={gear} alt="" onClick={() => setIsVisible(true)}></img>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;
