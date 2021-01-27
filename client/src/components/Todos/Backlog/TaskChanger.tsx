import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import { fetchAddTask } from '../../../store/ducks/todos/actions';
import { Priority } from '../../../store/ducks/todos/contracts/state';
import { selectTargets } from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import Select, { SelectItems } from '../../UI/Select';

interface Props {
	name: string;
	type?: 'change' | 'create';
	priority?: string
	selectItems: SelectItems[];
	notes: string;
	color?: string
	parentTarget?: string;
	textBtn?: string;
	// submitChanges(name: string, target?: string | null, notes?: string, priority?: string): void;
	close(): void;
}

const priorityItems = [
	{ id: '1', value: 'Высокий' },
	{ id: '2', value: 'Средний' },
	{ id: '3', value: 'Низкий' },
];

const TaskChanger: React.FC<Props> = props => {

	const dispatch = useDispatch()
	let content: string = props.name;

	if (props.type === 'create') {
		content = '';
	}

	const input = useInput({ initialValue: content });
	// const notesInput = useInput({initialValue: props.notes})
	const [parentTarget, setParentTarget] = useState<string>();
	const [priority, setPriority] = useState<string>();
	const [notesInput, setNotesInput] = useState<string>(props.notes);
	const [color, setColor] = useState<string | undefined>(props.color);

	const onChangeTask = () => {
		if (props.type === 'create') {
			// dispatch(fetchAddTask(input.value, parentTarget, notesInput, color, priority))
			props.close()
		}
		// props.submitChanges(input.value, parentTarget, notesInput, priority);
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	return (
		<div className="task-changer">
			<Modal title="Изменение задачи" closeModal={props.close}>
				<div className="task-changer__content">
					<Input onChange={input.onChange} value={input.value} />

					<Select
						items={props.selectItems}
						onItemClick={id => setParentTarget(id)}
						initialValue="Выбрать цель"
						initialId={props.parentTarget}
					/>

					<Select
						items={priorityItems}
						onItemClick={id => setPriority(id)}
						initialValue="Выбрать цель"
						initialId={props.priority}
					/>

					<textarea value={notesInput} onChange={e => onChangeArea(e)}></textarea>
				</div>

				<div className="task-changer__buttons">
					<Button onClick={onChangeTask} size="small">
						{props.textBtn ? props.textBtn : 'Ок'}
					</Button>
					<Button onClick={props.close} color="secondary" size="small">
						Отмена
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default TaskChanger;
