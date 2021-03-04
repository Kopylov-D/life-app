import React from 'react';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import Textarea from '../../UI/Textarea';

interface Props {
	notesValue: string;
	closeEditor(): void;
	onCancelNotesEdit(): void;
	onChangeNotes(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const NotesEditor: React.FC<Props> = props => {
	return (
		<Modal closeModal={props.closeEditor} class="notes-editor">
			<h4 className='notes-editor__header'>Заметки</h4>
			<Textarea
				value={props.notesValue}
				onChange={props.onChangeNotes}
				classNames="notes-editor"
			/>
			<div className="notes-editor__footer">
				<Button onClick={props.closeEditor} size="small" disabled={!!!props.notesValue}>
					Принять
				</Button>
				<Button onClick={props.onCancelNotesEdit} size="small" color="secondary">
					Отмена
				</Button>
			</div>
		</Modal>
	);
};

export default NotesEditor;
