import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectDataChart,
	selectIsLoading,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';

const Reports = () => {
	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);
	const options = useSelector(selectOptions);
	const data = useSelector(selectDataChart);

	const gradientOffset = () => {
		const dataMax = Math.max(...data.map(i => i.value));
		const dataMin = Math.min(...data.map(i => i.value));

		if (dataMax <= 0) {
			return 0;
		} else if (dataMin >= 0) {
			return 1;
		} else {
			return dataMax / (dataMax - dataMin);
		}
	};

	const off = gradientOffset();

	const changeDateHandler = (year: string, month: string) => {
		dispatch(getBudgetData(year, month));
	};

	return (
		<div className="budget__reports">
			<DatePanel changeDate={changeDateHandler} startDate={options.startDate} />

			{isLoading ? (
				<Loader type="cube-grid" />
			) : (
				<AreaChart
					width={730}
					height={250}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset={off} stopColor="green" stopOpacity={0.8} />
							<stop offset={off} stopColor="red" stopOpacity={1} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" interval="preserveStart" />
					<YAxis interval="preserveStart" />
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
			)}
		</div>
	);
};

export default Reports;
