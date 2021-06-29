
import { storage } from './storage';

const logic = (() => {
	const sortByDeadline = () => {
		return storage.tasks.sort((a, b) => (a.deadline < b.deadline ? 1 : -1));
	};
	const getUpcomingTasks = () => {
		let list = [];
		for (let i = 0; i < 3; i++) {
			list.push(sortByDeadline()[i]);
		}
		return list;
	};

	return { sortByDeadline, getUpcomingTasks };
})();

export { logic };
