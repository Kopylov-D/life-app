import React from 'react';
import Checkbox from '../../UI/Checkbox';

interface Props {
	id: string;
	value: string;
	isDone: boolean;
	onDelete(id: string): void;
	onChecked(id: string): void;
}

const Task: React.FC<Props> = props => {
	const onChangeHandler = (id: string) => {
		props.onChecked(id);
	};

	const onDeleteTask = () => {
		props.onDelete(props.id);
	};

	let task = (
		<div className="task__content">
			<Checkbox
				checked={props.isDone}
				id={props.id}
				onChangeHandler={onChangeHandler}
				value={props.value}
			/>

			<span className="task__expand material-icons">expand_more</span>
			<div className="task__counter">0/2</div>
		</div>
	);
	
	return (
		<div className="task">
			<div className="task__content">
				<Checkbox
					checked={props.isDone}
					id={props.id}
					onChangeHandler={onChangeHandler}
					value={props.value}
				/>

				<span className="task__expand material-icons">expand_more</span>
				<div className="task__counter">0/2</div>
			</div>

			<span className="task__button material-icons" onClick={onDeleteTask}>
				delete
			</span>
		</div>
	);
};

export default Task;
