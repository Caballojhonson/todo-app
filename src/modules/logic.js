import { compareAsc } from 'date-fns';
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

	const getPriorityColor = (priority) => {
		if (priority === 1) return 'rgba(142,255,69,1)';
		if (priority === 2) return 'rgba(77,191,0,1)';
		if (priority === 3) return 'rgba(255,213,0,1)';
		if (priority === 4) return 'rgba(255,92,0,1)';
		if (priority === 5) return 'rgba(255,0,0,1)';
	};

	const setPriorityCircleColor = (object, element) => {
		if (object.priority === 1) {
			element.style.background = `radial-gradient(circle, ${getPriorityColor(
				object.priority
			)} 40%, rgba(255,255,255,0) 100%)`;
		}
		if (object.priority === 2) {
			element.style.background = `radial-gradient(circle, ${getPriorityColor(
				object.priority
			)} 40%, rgba(255,255,255,0) 100%)`;
		}
		if (object.priority === 3) {
			element.style.background = `radial-gradient(circle, ${getPriorityColor(
				object.priority
			)} 40%, rgba(255,255,255,0) 100%)`;
		}
		if (object.priority === 4) {
			element.style.background = `radial-gradient(circle, ${getPriorityColor(
				object.priority
			)} 40%, rgba(255,255,255,0) 100%)`;
		}
		if (object.priority === 5) {
			element.style.background = `radial-gradient(circle, ${getPriorityColor(
				object.priority
			)} 40%, rgba(255,255,255,0) 100%)`;
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

	const getTasksForDay = (dirtyDate) => {
		let cleanDate = new Date(dirtyDate);
		let matchingDeadlines = [];

		for (let c1 = 0; c1 < storage.projects.length; c1++) {
			let project = storage.projects[c1];

			for (let c2 = 0; c2 < project.tasks.length; c2++) {
				let deadline = new Date(project.tasks[c2].deadline);

				if (compareAsc(cleanDate, deadline) === 0) {
					matchingDeadlines.push([
						storage.projects[c1].name,
						storage.projects[c1].tasks[c2],
					]);
				}
			}
		}
		return matchingDeadlines;
		//returns array [projectName, {Task Object}]
	};

	const getDeadlineDates = () => {
		const deadlines = [];
		const tasks = storage.tasks;
		for (let i = 0; i < tasks.length; i++) {
			deadlines.push(new Date(tasks[i].deadline));
		}
		return deadlines;
		//returns array [cleanDate]
	};

	const dayHasDeadline = (dirtyDate) => {
		let cleanDate = new Date(dirtyDate);
		let deadlines = [];

		for (let i = 0; i < getDeadlineDates().length; i++) {
			deadlines.push(getDeadlineDates()[i]);
		}

		if (deadlines.find((deadline) => compareAsc(cleanDate, deadline) === 0))
			return true;
		else return false;
		//returns boolean
	};

	const getHighestPriority = (dirtyDate) => {
		const cleanDate = new Date(dirtyDate);
		const tasks = storage.tasks;
		let priorities = [];

		if (dayHasDeadline(dirtyDate)) {
			for (let i = 0; i < tasks.length; i++) {
				if (compareAsc(new Date(tasks[i].deadline), cleanDate) === 0) {
					priorities.push(tasks[i].priority);
				}
			}
		}

		priorities.sort((a, b) => b - a);
		return priorities[0];
		//returns highest priority number in a given day
	};

	const getCompletionPercent = (project) => {
		const tasks = project.tasks;
		let completedTasks = [];

		for (let i = 0; i < tasks.length; i++) {
			let completed = tasks[i].complete;

			if (completed === true) completedTasks.push(tasks[i])
		}
		let percentage = Math.round((completedTasks.length / tasks.length) * 100)

		return `${percentage}%`
	}

	const generateProjectCompletionText = (project) => {
		if(project.tasks.length === 0) {
			return 'No tasks in this project'
		}else return `${logic.getCompletionPercent(storage.projects[i])} Complete`
	}

	return {
		sortByDeadline,
		getUpcomingTasks,
		setPriorityCircleColor,
		dueOrOverdue,
		countStats,
		getTasksForDay,
		getPriorityColor,
		dayHasDeadline,
		getHighestPriority,
		getCompletionPercent,
		generateProjectCompletionText,
	};
})();

export { logic };
