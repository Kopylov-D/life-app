import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import Table from '../../Table';
import Button from '../../UI/Button';
import NewBacklogTask from './NewBacklogTask';
import Target from './Target';
import { useInput } from '../../../hooks/input.hook';
import Input from '../../UI/Input';
import { useDispatch } from 'react-redux';
import { fetchAddTarget } from '../../../store/ducks/todos/actions';

interface Props {}

const Backlog: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const [addTargetModalIsOpen, setAddTargetModalIsOpen] = useState<boolean>(false);
	const addTargetInput = useInput(
		{ initialValue: '' },
		{ required: true, maxLength: 30 }
	);

	const addTargetHandler = () => {
		setAddTargetModalIsOpen(true);
	};

	const createTargetHandler = async () => {
		// await api.addTarget(addTargetInput.value)
		dispatch(fetchAddTarget(addTargetInput.value));
		setAddTargetModalIsOpen(true);
	};

	return (
		<div className="todos__backlog">
			<div className="backlog__targets">
				{/* <Target/>
				<Target/>
				<Target/> */}
				<Button onClick={addTargetHandler} size="small">
					Новая цель
				</Button>
			</div>
			<Table class="backlog" headerItems={['Срок выполнения', 'Название', 'Приоритет']}>
				<NewBacklogTask />
			</Table>

			{addTargetModalIsOpen && (
				<Modal closeModal={() => setAddTargetModalIsOpen(false)} backdropType="black">
					<Input
						onChange={addTargetInput.onChange}
						value={addTargetInput.value}
						touched={addTargetInput.touched}
						valid={addTargetInput.valid}
						type="text"
						placeholder="Новая цель"
					/>

					<Button onClick={createTargetHandler} size="small">
						Добавить
					</Button>
					<Button onClick={() => setAddTargetModalIsOpen(false)} size="small">
						Отмена
					</Button>
				</Modal>
			)}
		</div>
	);
};

export default Backlog;
