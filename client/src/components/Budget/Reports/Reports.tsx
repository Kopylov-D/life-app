import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectBalanceWithFormatDate,
	selectColumns,
	selectLoadingStatus,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import { LoadingStatus } from '../../../store/types';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';

const Reports = () => {
	const dispatch = useDispatch();

	const loadingStatus = useSelector(selectLoadingStatus);
	const options = useSelector(selectOptions);
	const columns = useSelector(selectColumns);
	const balance = useSelector(selectBalanceWithFormatDate);

	useEffect(() => {
		dispatch(getBudgetData());
	}, []);

	const gradientOffset = () => {
		const dataMax = Math.max(...balance.map(i => i.value));
		const dataMin = Math.min(...balance.map(i => i.value));

		if (dataMax <= 0) {
			return 0;
		} else if (dataMin >= 0) {
			return 1;
		} else {
			return dataMax / (dataMax - dataMin);
		}
	};

	const off = gradientOffset();

	const changeDateHandler = (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) => {
		dispatch(getBudgetData(year, month, all, fullYear));
	};

	return (
		<div className="reports">
			<div className="budget__panel">
				<DatePanel changeDate={changeDateHandler} startDate={options.startDate} />
			</div>

			{loadingStatus === LoadingStatus.LOADING ? (
				<Loader type="cube-grid" />
			) : balance.length < 1 ? (
				'Нет данных за выбранный период'
			) : (
				<Fragment>
					<div className="reports__header">Баланс</div>
					<AreaChart
						width={750}
						height={350}
						data={balance}
						margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
					>
						<defs>
							<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
								<stop offset={off} stopColor="green" stopOpacity={0.8} />
								<stop offset={off} stopColor="red" stopOpacity={1} />
							</linearGradient>
						</defs>
						<XAxis dataKey="date" interval="preserveStart" />
						<YAxis padding={{ bottom: 20, top: 20 }} interval="preserveStart" />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="value"
							stroke="#000"
							fillOpacity={1}
							activeDot={{ r: 4 }}
							fill="url(#colorUv)"
						/>
					</AreaChart>

					<div className="reports__header">Расход/Доход</div>
					<BarChart
						width={750}
						height={350}
						data={columns}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar name="Расходы" dataKey="expense" fill="#8884d8" />
						<Bar name="Доходы" dataKey="income" fill="#82ca9d" />
					</BarChart>
				</Fragment>
			)}
		</div>
	);
};

export default Reports;
