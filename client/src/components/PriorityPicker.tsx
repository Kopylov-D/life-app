import React, { Fragment, useState } from 'react';
import { ReactComponent as PriorityIcon } from '../assets/icons/flag-outline.svg';
import { Priority } from '../store/ducks/todos/contracts/state';
import Dropdown from './UI/Dropdown';
import CheckIcon from './UI/Icons/CheckIcon';
import Icon from './UI/Icons/Icon';

interface Props {
	priority: Priority;
	changePriority(id: number): void;
}

const priorityPickerItems = [
	{ id: 1, name: 'Высокий' },
	{ id: 2, name: 'Средний' },
	{ id: 3, name: 'Низкий' },
	{ id: 0, name: 'Без приоритета' },
];

const PriorityPicker: React.FC<Props> = props => {
	// const [priority, setPriority] = useState<Priority>(props.priority || Priority.none);
	const [priorityPickerIsOpen, setPriorityPickerIsOpen] = useState<boolean>(false);

	const onTogglePriorityPickerHandler = (e: React.MouseEvent) => {
		setPriorityPickerIsOpen(!priorityPickerIsOpen);
	};

	const onChangePriorityHandler = (id: Priority) => {
		props.changePriority(id);
		setPriorityPickerIsOpen(false);
	};

	return (
		<div className='with-dropdown'>
			{/* <img
				className="task-editor__icon with-dropdown"
				src={thunder}
				alt=""
				onClick={onTogglePriorityPickerHandler}
			></img> */}
				<Icon name="priority" onClick={onTogglePriorityPickerHandler}>
					<PriorityIcon />
				</Icon>

			{priorityPickerIsOpen && (
				<Dropdown
					items={priorityPickerItems}
					onClick={onChangePriorityHandler}
					value={props.priority}
				/>
			)}
		</div>
	);
};

export default PriorityPicker;
