import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../services/api';
import {
	addCategory,
	getBudgetData,
} from '../../store/ducks/budget/actions';
import { TransactionInterface } from '../../store/ducks/budget/types';
import { Button } from '../UI';
import Select from '../UI/Select';
import Table from './Table';

type Props = {
	// data: TransactionInterface[];
};

const Expense: React.FC<Props> = props => {
	useEffect(() => {
		dispatch(getBudgetData());
	}, []);

	const dispatch = useDispatch();

	const testHandler = async () => {
		const res = await api.getUser();
		console.log(res);
	};

	const addCategoryHandler = async () => {
		dispatch(addCategory())
	};

	return (
		<div className="budget__expense">
			<div className="budget__panel">
				<Select/>
			</div>
			<Table />
			<Button type="primary" disabled={false} onClick={addCategoryHandler}>+</Button>
			<Button type="secondary" disabled={false} onClick={testHandler} />
		</div>
	);
};

export default Expense;
