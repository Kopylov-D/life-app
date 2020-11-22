import React from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../services/api';
import { addCategory } from '../../store/ducks/budget/actions';
import { TransactionInterface } from '../../store/ducks/budget/types';
import { Button } from '../UI';
import Table from './Table';

type Props = {
	data: TransactionInterface[]
}

const Expense: React.FC<Props> = (props) => {

	const dispatch = useDispatch()

	const addCategoryHandler = async () => {
		// dispatch(addCategory('Новая категория', 'red'))

		const res = await api.addCategory('Новая категория', 'red')

		console.log(res)



	}

	return (
		<div className="budget__expense">
			<Table/>
			<Button type='primary' disabled={false} onClick={addCategoryHandler}/>
		</div>
	);
};

export default Expense;
