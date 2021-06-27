import { dateTime } from './dateTime';
import { storage } from './storage';

const projects = (() => {
	const createProject = (name, description) => {
		const type = 'project';
		const completed = false;
		const pendingTasks = [];
		const completedTasks = [];
		const createdOn = dateTime.current;

		storeProject({
			name,
			description,
			pendingTasks,
			completedTasks,
			createdOn,
			completed,
			type,
		});
	};

	const storeProject = (project) => {
		storage.localStore('project', project);
		storage.pushProjectsFromStorage();
	};

	return { createProject };
})();

const tasks = (() => {
	const createTask = (name, description, dueDate, priority) => {
		const type = 'task';
		const createdOn = dateTime.current;
		const completed = false;

		saveTask({
			name,
			description,
			dueDate,
			priority,
			createdOn,
			completed,
			type,
		});
	};

	const saveTask = (task) => {
		storage.localStore('task', task);
		storage.pushTasksFromStorage();
	};

	return { createTask };
})();

const notes = (() => {

	const createNote = (name, content) => {
		const type = 'note';
		const createdOn = dateTime.current;

		saveNote({
			name,
			content,
			createdOn,
			type,
		});
	};

	const saveNote = (task) => {
		storage.localStore('task', task);
		storage.pushTasksFromStorage();
	};

	return { createNote };
})();

export { tasks, projects, notes };
