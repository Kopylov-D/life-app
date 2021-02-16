import React from 'react';
import ReactCalendar from 'react-calendar';
import Modal from './UI/Modal';

interface Props {
	currentDate: Date;
	onChange(value: Date | Date[]): void;
	closeCalendar(): void;
}

const Calendar: React.FC<Props> = props => {
	return (
		<Modal closeModal={props.closeCalendar} backdropType="black" class="react-calendar">
			<ReactCalendar value={props.currentDate} onChange={props.onChange} />
		</Modal>
	);
};

export default Calendar;
