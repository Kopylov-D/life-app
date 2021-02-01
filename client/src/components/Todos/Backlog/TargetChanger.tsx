import React, { useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import {
	ColorInterface,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';
import Colorpicker from '../../Colorpicker';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';

interface Props extends TargetInterface {
	// name: string;
	colors: ColorInterface[];
	// selectItems: SelectItems[];
	// notes: string;
	// parentTarget?: string;
	submitChanges(target: TargetInterface): void;
	close(): void;
}

const TargetChanger: React.FC<Props> = ({
	_id,
	name,
	notes,
	color,
	date,
	isDone,
	expiresIn,
	priority,
	colors,
	submitChanges,
	close,
}) => {
	const input = useInput({ initialValue: name });
	// const notesInput = useInput({initialValue: props.notes})
	// const [parentTarget, setParentTarget] = useState<string | null>(null);
	const [notesInput, setNotesInput] = useState<string>(notes);
	const [colorId, setColorId] = useState<string | undefined>(color);

	const onChangeTarget = () => {
		submitChanges({
			_id,
			name: input.value,
			notes: notesInput,
			color: colorId,
			date,
			isDone,
			expiresIn,
			priority,
		});
		close();
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	const onColorSelect = (id: string) => {
		setColorId(id);
	};

	return (
		<div className="target-editor">
			<Modal class="target-editor" closeModal={close} backdropType="black">
				<form onSubmit={onChangeTarget}>
					<Input
						onChange={input.onChange}
						value={input.value}
						touched={input.touched}
						valid={input.valid}
						type="text"
						// placeholder="Новая цель"
					/>

					<Colorpicker colors={colors} onColorSelect={onColorSelect} />

					<textarea value={notesInput} onChange={e => onChangeArea(e)}></textarea>

					<div className="target-editor__buttons">
						<Button onClick={onChangeTarget} size="small">
							Изменить
						</Button>
						<Button onClick={close} size="small" color="secondary">
							Отмена
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default TargetChanger;
