import React, { useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import Select, { SelectItems } from '../../UI/Select';

interface Props {
	name: string;
	selectItems: SelectItems[];
	notes: string;
	submitChanges(name: string, target?: string | null, notes?: string): void;
	close(): void;
}

const TaskChanger: React.FC<Props> = props => {
	const input = useInput({ initialValue: props.name });
	// const notesInput = useInput({initialValue: props.notes})
	const [parentTarget, setParentTarget] = useState<string | null>(null);
	const [notesInput, setNotesInput] = useState(props.notes);

	const onChangeTask = () => {
		props.submitChanges(input.value, parentTarget, notesInput);
	};

	const onChangeArea = () => {
		setNotesInput(notesInput)
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
					/>

					<textarea
						value={notesInput}
						onChange={onChangeArea}
					></textarea>
				</div>

				<div className="task-changer__buttons">
					<Button onClick={onChangeTask} size="small">
						Изменить
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
