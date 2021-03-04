import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
	fetchAddTransaction,
	fetchDeleteTransaction,
	getBudgetData,
} from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectCurrentCategory,
	selectOptions,
	selectTransactions,
} from '../../../store/ducks/budget/selectors';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';
import Table, { HeaderItemsInterface } from '../../Table';
import NewTransaction from './NewTransaction';
import Transaction from './Transaction';
import { selectLoadingStatus } from '../../../store/ducks/auth/selectors';
import { TransactionInterface } from '../../../store/ducks/budget/contracts/state';
import { LoadingStatus } from '../../../store/types';

const headerItems: HeaderItemsInterface[] = [
	{ id: 'date', isActive: false, name: 'Дата', needSort: false },
	{ id: 'name', isActive: false, name: 'Значение', needSort: false },
	{ id: 'category', isActive: false, name: 'Категория', needSort: false },
];

const Operations: React.FC = () => {
	const dispatch = useDispatch();

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);
	const loadingStatus = useSelector(selectLoadingStatus);

	useEffect(() => {
		dispatch(getBudgetData());
	}, []);

	const changeDateHandler = (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) => {
		dispatch(getBudgetData(year, month, all, fullYear));
	};

	const onAddTransactionHandler = (
		categoryId: string,
		amount: number,
		isExpense: boolean,
		currentDate: Date
	) => {
		const transaction: TransactionInterface = {
			_id: '',
			category: {
				_id: categoryId,
				name: '',
			},
			amount,
			isExpense,
			user: '',
			date: currentDate,
		};
		dispatch(fetchAddTransaction(transaction));
	};

	const onDeleteTransactionHandler = (_id: string) => {
		dispatch(fetchDeleteTransaction(_id));
	};

	return (
		<Fragment>
			<div className="budget__panel">
				<DatePanel changeDate={changeDateHandler} startDate={options.startDate} />
			</div>
			{loadingStatus === LoadingStatus.LOADING ? (
				<Loader type="cube-grid" />
			) : (
				<div>
					<Table className="operations" headerItems={headerItems}>
						<NewTransaction
							categories={categories}
							currentCategory={currentCategory}
							onAddTransaction={onAddTransactionHandler}
						/>

						<TransitionGroup>
							{transactions.map(item => {
								return (
									<CSSTransition
										timeout={200}
										key={item._id}
										classNames="transaction"
										mountOnEnter
										unmountOnExit
									>
										<Transaction
											_id={item._id}
											category={item.category}
											user={item.user}
											date={item.date}
											amount={item.amount}
											isExpense={item.isExpense}
											onDeleteTransaction={onDeleteTransactionHandler}
										/>
									</CSSTransition>
								);
							})}
						</TransitionGroup>
					</Table>
				</div>
			)}
		</Fragment>
	);
};

export default Operations;
