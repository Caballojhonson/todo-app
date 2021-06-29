import { format, getDaysInMonth } from 'date-fns';
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
		totalDays: getDaysInMonth(now()),
	};

	const getTimeToUpcomingDeadlines = () => {
		let times = [];
		for (let i = 0; i < logic.getUpcomingTasks().length; i++) {
			times.push(formatDistanceStrict(now(), new Date(logic.getUpcomingTasks()[i].deadline)));
		}
		return times;
	}

	return { current, thisMonth, getTime, getTimeToUpcomingDeadlines };
})();

export { dateTime };
