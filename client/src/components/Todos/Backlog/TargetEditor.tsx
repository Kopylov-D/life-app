import React, { useEffect, useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import {
	ColorInterface,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';
import Colorpicker from '../../Colorpicker';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import clock from '../../../assets/icons/Clock.svg';
import trash from '../../../assets/icons/Trash.svg';
import thunder from '../../../assets/icons/Priority.svg';
import check from '../../../assets/icons/Check.svg';
import Textarea from '../../UI/Textarea';

interface Props {
	type: 'edit' | 'create';
	colors: ColorInterface[];
	submit(target: TargetInterface): void;
	closeEditor(): void;
	deleteTarget?(id: string): void;

	_id?: string;
	name?: string;
	isDone?: boolean;
	notes?: string;
	color?: string;
	date?: Date;
	expiresIn?: Date;
	// priority,
}

const TargetEditor: React.FC<Props> = ({
	_id = '',
	name = '',
	notes = '',
	color,
	date,
	isDone = false,
	expiresIn,
	// priority,
	colors,
	type,
	submit,
	deleteTarget,
	closeEditor,
}) => {
	const input = useInput({ initialValue: name });
	// const notesInput = useInput({initialValue: props.notes})
	// const [parentTarget, setParentTarget] = useState<string | null>(null);
	const [notesInput, setNotesInput] = useState<string>(notes);
	const [colorId, setColorId] = useState<string | undefined>(color);
	const [currentDate, setCurrentDate] = useState<Date | undefined>(expiresIn);

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			submitChanges();
		}
	};

	useEffect(() => {
console.log('sdsd');

	}, [])

	const submitChanges = () => {
		if (input.valid) {
			let target: TargetInterface;

			if (type === 'edit') {
				target = {
					_id,
					date: date!,
					isDone: isDone,
					color: colorId,
					name: input.value,
					notes: notesInput,
					expiresIn: currentDate,
					// priority,
				};
			} else {
				target = {
					_id: '',
					date: new Date(),
					isDone: false,
					name: input.value,
					color: colorId && colorId,
					notes: notesInput,
					expiresIn: currentDate,
					// priority,
				};
			}
			submit(target);
			type === 'create' && input.clearValue();
			closeEditor();
		}
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	const onColorSelect = (id: string) => {
		setColorId(id);
	};

	const onDeleteTarget = () => {
		type === 'edit' && deleteTarget!(_id);
	};

	return (
		<div className="target-editor">
			<Modal class="target-editor" closeModal={closeEditor} backdropType="black">
				{/* <form onSubmit={onFormSubmit}> */}
				<Input
					onChange={input.onChange}
					value={input.value}
					touched={input.touched}
					valid={input.valid}
					type="text"
					onKeyPress={onKeyEnter}
					placeholder="Новая цель"
				/>

				<Colorpicker colors={colors} initialColor={color} onColorSelect={onColorSelect} />

				<Textarea value={notesInput} onChange={onChangeArea} />

				<div className="target-editor__options">
					<img src={thunder} alt="" onClick={() => {}} />
					<img src={clock} alt="" onClick={() => {}} />
					<img src={check} alt="" onClick={() => {}} />

					{type === 'edit' && <img src={trash} alt="" onClick={onDeleteTarget} />}
				</div>

				<div className="target-editor__buttons">
					<Button onClick={submitChanges} size="small">
						{type === 'edit' ? 'Изменить' : 'Создать'}
					</Button>
					<Button onClick={closeEditor} size="small" color="secondary">
						Отмена
					</Button>
				</div>
				{/* </form> */}
			</Modal>
		</div>
	);
};

export default TargetEditor;
