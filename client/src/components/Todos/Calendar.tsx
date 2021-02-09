import React from 'react';
import ReactCalendar from 'react-calendar';
import Backdrop from '../UI/Backdrop';

interface Props {
	currentDate: Date;
	onChange(value: Date | Date[]): void;
	closeCalendar(): void;
}

const Calendar: React.FC<Props> = props => {
	return (
		<div className="calendar">
			<ReactCalendar value={props.currentDate} onChange={props.onChange} />
			<Backdrop onClick={props.closeCalendar} type="black" />
		</div>
	);
};

export default Calendar;
