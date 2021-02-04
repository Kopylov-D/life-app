import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddCard } from '../../../store/ducks/todos/actions';
import {
	selectCards,
	selectCardsNumber,
	selectColors,
	selectSubtasks,
	selectTasks,
} from '../../../store/ducks/todos/selectors';
import Button from '../../UI/Button';
import Card from './Card';
import { CardInterface } from '../../../store/ducks/todos/contracts/state';

interface Props {
	cards: CardInterface[];
}

export const Board: React.FC<any> = props => {
	const dispatch = useDispatch();
	const cardsNumber = useSelector(selectCardsNumber);
	const cards = useSelector(selectCards);
	const tasks = useSelector(selectTasks);
	const subtasks = useSelector(selectSubtasks);
	const colors = useSelector(selectColors)

	const onCreateCartHandler = () => {
		dispatch(fetchAddCard(cardsNumber + 1));
	};

	return (
		<div className="board">
			<div className="board__cards">
				{cards.map(card => (
					<Card
						key={card._id}
						// _id={card._id}
						// level={card.level}
						// name={card.name}
						{...card}
						tasks={tasks}
						subtasks={subtasks}
						colors={colors}
					/>
				))}
			</div>
			<Button onClick={onCreateCartHandler}>Создать карточку</Button>
		</div>
	);
};
