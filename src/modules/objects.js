import { dateTime } from './dateTime';
import { storage } from './storage';


	const createProject = (name, description) => {
		const type = 'project';
		const complete = false;
		const tasks = [];
		const createdOn = dateTime.current;

		storage.save({
			name,
			description,
			tasks,
			createdOn,
			complete,
			type
		});
	};

	const createTask = (name, description, dueDate, priority) => {
		const type = 'task';
		const createdOn = dateTime.current;
		const complete = false;

		storage.save({
			name,
			description,
			dueDate,
			priority,
			createdOn,
			complete,
			type
		});
	};

	const createNote = (name, content) => {
		const type = 'note';
		const createdOn = dateTime.current;

		storage.save({
			name,
			content,
			createdOn,
			type
		});
	};

export { createProject, createTask, createNote };
