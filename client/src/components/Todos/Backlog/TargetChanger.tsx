import React, { useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';

interface Props {
  name: string;
	// selectItems: SelectItems[];
	notes: string;
	// parentTarget?: string;
	submitChanges(name: string, notes: string): void;
	close(): void;
}

const TargetChanger: React.FC<Props> = props => {

  const input = useInput({ initialValue: props.name });
	// const notesInput = useInput({initialValue: props.notes})
	// const [parentTarget, setParentTarget] = useState<string | null>(null);
	const [notesInput, setNotesInput] = useState<string>(props.notes);

	const onChangeTarget = () => {
		props.submitChanges(input.value, notesInput);
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
  };
  
	return (
		<div className="target-changer">
			<Modal closeModal={props.close} backdropType="black">
				<Input
					onChange={input.onChange}
					value={input.value}
					touched={input.touched}
					valid={input.valid}
					type="text"
					// placeholder="Новая цель"
				/>

					<textarea value={notesInput} onChange={e => onChangeArea(e)}></textarea>

				<Button onClick={onChangeTarget} size="small">
					Изменить
				</Button>
				<Button onClick={props.close} size="small">
					Отмена
				</Button>
			</Modal>
		</div>
	);
};

export default TargetChanger;
