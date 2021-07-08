import { add, format, getDaysInMonth, sub } from 'date-fns';
import { formatDistanceStrict } from 'date-fns/esm';
import { logic } from './logic';

const dateTime = (() => {


	const now = () => new Date();

	const getTime = () => format(now(), 'p');
	
	const current = {
		day: format(now(), 'P'),
		time: format(now(), 'p'),
		timestamp: getTime(now()),
	};

	const thisMonth = {
		month: format(now(), 'LLLL'),
		monthAndYear: format(now(), `LLLL yyyy`),
		totalDays: getDaysInMonth(now()),
	};

	const getTimeToUpcomingDeadlines = () => {
		let times = [];
		for (let i = 0; i < logic.getUpcomingTasks().length; i++) {
			times.push(formatDistanceStrict(now(), new Date(logic.getUpcomingTasks()[i].deadline)));
		}
		return times;
	}

	const generateCalendar = (date) => {
		let numberOfDays = getDaysInMonth(new Date(date));
		let daysInMonth = [];

		for (let i = 1; i <= numberOfDays; i++) {
			daysInMonth.push(i);
		}

		return daysInMonth;
	}

	const addMonth = (date) => {
		let result = add(new Date(date), {months: 1});
		return format(result, `LLLL yyyy`)
	}
	const substractMonth = (date) => {
		let result = sub(new Date(date), {months: 1})
		return format(result, `LLLL yyyy`)
	}


	return { current, thisMonth, getTime, getTimeToUpcomingDeadlines, generateCalendar, addMonth, substractMonth };
})();

export { dateTime };
