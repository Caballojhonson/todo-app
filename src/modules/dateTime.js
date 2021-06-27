import { format, getTime } from 'date-fns'

const dateTime = (() => {

	const current =  {
        day: format(new Date(), 'P'),
        time: format(new Date(), 'p'),
        timestamp: getTime(new Date())
    } 

	return { current };
})();

export { dateTime };
