import { add, format, getDaysInMonth, getMonth, getTime } from 'date-fns';

const dateTime = (() => {
	const now = () => new Date();

	const current = {
		day: format(now(), 'P'),
		time: format(now(), 'p'),
		timestamp: getTime(now()),
	};

	const thisMonth = {
		month: format(now(), 'LLLL'),
		totalDays: getDaysInMonth(now()),
	};

	return { current, thisMonth };
})();

export { dateTime };
