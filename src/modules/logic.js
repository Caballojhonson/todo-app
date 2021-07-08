import { dateTime } from './dateTime';
import { storage } from './storage';

const logic = (() => {
	const sortByDeadline = () => {
		return storage.tasks.sort((a, b) =>
			new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
		);
	};
	const getUpcomingTasks = () => {
		let list = [];
		for (let i = 0; i < 3; i++) {
			list.push(sortByDeadline()[i]);
		}

		return list;
	};

	const dueOrOverdue = (deadline, timeTo) => {
		if (new Date(deadline) > new Date()) return `Due in ${timeTo}`;
		else return `${timeTo} overdue!`;
	};

	const changePriorityColor = (object, element) => {
		if (object.priority === 1) {
			element.style.background =
				'radial-gradient(circle, rgba(142,255,69,1) 40%, rgba(255,255,255,0) 100%)';
		}
		if (object.priority === 2) {
			element.style.background =
				'radial-gradient(circle, rgba(77,191,0,1) 40%, rgba(255,255,255,0) 100%)';
		}
		if (object.priority === 3) {
			element.style.background =
				'radial-gradient(circle, rgba(255,213,0,1) 40%, rgba(255,255,255,0) 100%)';
		}
		if (object.priority === 4) {
			element.style.background =
				'radial-gradient(circle, rgba(255,92,0,1) 40%, rgba(255,255,255,0) 100%)';
		}
		if (object.priority === 5) {
			element.style.background =
				'radial-gradient(circle, rgba(255,0,0,1) 40%, rgba(255,255,255,0) 100%)';
		} else {
			return 'Error setting priority color';
		}
	};

	const countStats = () => {
		let pendingTasks = [];
		let pendingProjects = [];
		let completedTasks = [];
		let completedProjects = [];

		for (let i = 0; i < storage.tasks.length; i++) {
			if (storage.tasks[i].complete === false) {
				pendingTasks.push(storage.tasks[i]);
			} else if (storage.tasks[i].complete === true) {
				completedTasks.push(storage.tasks[i]);
			}
		}

		for (let i = 0; i < storage.projects.length; i++) {
			if (storage.projects[i].complete === false) {
				pendingProjects.push(storage.projects[i]);
			} else if (storage.projects[i] === true) {
				completedProjects.push(storage.projects[i]);
			}
		}

		let pendingTaskCount = pendingTasks.length;
		let pendingProjectCount = pendingProjects.length;
		let completedTaskCount = completedTasks.length;
		let completedProjectCount = completedProjects.length;

		return {
			pendingTaskCount,
			pendingProjectCount,
			completedTaskCount,
			completedProjectCount,
		};
	};

	

	return {
		sortByDeadline,
		getUpcomingTasks,
		changePriorityColor,
		dueOrOverdue,
		countStats,
	};
})();

export { logic };
