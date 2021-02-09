import React, { useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import {
	ColorInterface,
	Priority,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';
import Colorpicker from '../../Colorpicker';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import { ReactComponent as Clock } from '../../../assets/icons/time-outline.svg';
import { ReactComponent as Trash } from '../../../assets/icons/trash-outline.svg';
import Textarea from '../../UI/Textarea';
import Checkbox from '../../UI/Checkbox';
import { toDate } from '../../../services/utils/dateUtils';
import Calendar from '../Calendar';
import PriorityPicker from '../../PriorityPicker';
import Icon from '../../UI/Icons/Icon';

interface Props {
	type: 'edit' | 'create';
	colors: ColorInterface[];
	submit(target: TargetInterface): void;
	closeEditor(): void;
	deleteTargetHandler?(id: string): void;

	_id?: string;
	name?: string;
	isDone?: boolean;
	notes?: string;
	color?: string;
	date?: Date;
	expiresIn?: Date;
	priority?: Priority;
}

const TargetEditor: React.FC<Props> = props => {
	const input = useInput({ initialValue: props.name || '' });
	const [notesInput, setNotesInput] = useState<string>(props.notes || '');
	const [colorId, setColorId] = useState<string | undefined>(props.color);
	const [currentDate, setCurrentDate] = useState<Date>(
		props.expiresIn ? toDate(props.expiresIn) : new Date()
	);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [isChecked, setIsChecked] = useState<boolean>(props.isDone || false);
	const [priority, setPriority] = useState<Priority>(props.priority || Priority.none);

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			submitChanges();
		}
	};

	const onChangeDateHandler = (value: Date | Date[]) => {
		if (Array.isArray(value)) {
			setCurrentDate(value[0]);
		} else setCurrentDate(value);

		setCalendarIsOpen(false);
	};

	const submitChanges = () => {
		if (input.valid) {
			let target: TargetInterface;

			if (props.type === 'edit') {
				target = {
					_id: props._id!,
					date: currentDate!,
					isDone: isChecked,
					color: colorId,
					name: input.value,
					notes: notesInput,
					expiresIn: currentDate,
					priority,
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
					priority,
				};
			}
			props.submit(target);
			props.type === 'create' && input.clearValue();
			props.closeEditor();
		}
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	const onColorSelect = (id: string) => {
		setColorId(id);
	};

	const onDeleteTarget = () => {
		props.type === 'edit' && props.deleteTargetHandler!(props._id!);
	};

	return (
		<div className="target-editor">
			<Modal class="target-editor" closeModal={props.closeEditor} backdropType="black">
				<Input
					onChange={input.onChange}
					value={input.value}
					touched={input.touched}
					valid={input.valid}
					type="text"
					onKeyPress={onKeyEnter}
					placeholder="Новая цель"
				/>

				<Colorpicker
					colors={props.colors}
					initialColor={props.color}
					onColorSelect={onColorSelect}
				/>

				<Textarea value={notesInput} onChange={onChangeArea} />

				<div className="target-editor__options">
					<PriorityPicker
						priority={priority}
						changePriority={(id: number) => setPriority(id)}
					/>
					<Icon name="clock" onClick={() => setCalendarIsOpen(true)}>
						<Clock />
					</Icon>
					<span className="target-editor__checkbox">
						<Checkbox
							checked={isChecked}
							onChangeHandler={() => setIsChecked(!isChecked)}
						/>
					</span>

					{props.type === 'edit' && (
						<Icon name="trash" onClick={onDeleteTarget}>
							<Trash />
						</Icon>
					)}
				</div>

				<div className="target-editor__buttons">
					<Button onClick={submitChanges} size="small">
						{props.type === 'edit' ? 'Изменить' : 'Создать'}
					</Button>
					<Button onClick={props.closeEditor} size="small" color="secondary">
						Отмена
					</Button>
				</div>
			</Modal>

			{calendarIsOpen && (
				<Calendar
					currentDate={currentDate}
					onChange={onChangeDateHandler}
					closeCalendar={() => setCalendarIsOpen(false)}
				/>
			)}
		</div>
	);
};

export default TargetEditor;
