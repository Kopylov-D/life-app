import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCoordinate from '../../../hooks/useCoordinate.hook';
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
import Tooltip from '../../UI/Tooltip';

export const Board: React.FC = () => {
	const dispatch = useDispatch();
	const cardsNumber = useSelector(selectCardsNumber);
	const cards = useSelector(selectCards);
	const tasks = useSelector(selectTasks);
	const subtasks = useSelector(selectSubtasks);
	const colors = useSelector(selectColors);

	const parentRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);
	const {coords, setIsVisible, isVisible} = useCoordinate(parentRef, childRef)


	// const [isVisible, setIsVisible] = useState<boolean>(true);


	// console.log(coords);
	

	const onCreateCardHandler = () => {
		dispatch(fetchAddCard(cardsNumber + 1));
	};

	const onMouseOver = () => {
		setIsVisible(true);
	};
	const onMouseLeave = () => {
		setIsVisible(false);
	};

	return (
		<div className="board">
			<div className="board__cards">
				{cards.map(card => (
					<Card
						key={card._id}
						{...card}
						tasks={tasks}
						subtasks={subtasks}
						colors={colors}
					/>
				))}
			</div>
			<Button onClick={onCreateCardHandler}>Создать карточку</Button>
		<div ref={parentRef}
		 onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
		 >
				asdf
			</div>
		<Tooltip selfRef={childRef} coords={coords} />
		</div>
	);
};
