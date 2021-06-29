import { storage } from './storage';

const logic = (() => {
	const sortByDeadline = () => {
		return storage.tasks.sort((a, b) =>
			new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
		);
	};
	const getUpcomingTasks = () => {
		let list = [];
		//let invertedList = [];
		for (let i = 0; i < 3; i++) {
			list.push(sortByDeadline()[i]);
		}
		//for (let i = 0; i < list.length; i++) {
		//    invertedList.push(list[i])
		//}
		return list;
	};

	const dueOrOverdue = (deadline, timeTo) => {
		if (new Date(deadline) > new Date()) return `Due in ${timeTo}`;
		else return `${timeTo} overdue!`;
	};

	const changePriorityColor = (object, element) => {
		if (object.priority === 1) {
			element.style.backgroundColor = 'greenyellow';
		}
		if (object.priority === 2) {
			element.style.backgroundColor = 'green';
		}
		if (object.priority === 3) {
			element.style.backgroundColor = 'orange';
		}
		if (object.priority === 4) {
			element.style.backgroundColor = 'orangered';
		}
		if (object.priority === 5) {
			element.style.backgroundColor = 'red';
		} else {
			return 'Error setting priority color';
		}
	};

	return { sortByDeadline, getUpcomingTasks, changePriorityColor, dueOrOverdue };
})();

export { logic };
