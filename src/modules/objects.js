
import { dateTime } from './dateTime';
import { storage } from './storage';


	const createProject = (name, description) => {
		const type = 'project';
		const complete = false;
		const tasks = [];
		const createdOn = dateTime.current;
		const index = storage.projects.length;

		storage.save({
			name,
			description,
			tasks,
			createdOn,
			complete,
			type,
			index
		});
	};

	const createTask = (name, description, deadline, priority, fromProject) => {
		const type = 'task';
		const createdOn = dateTime.current;
		const complete = false;
		const index = storage.tasks.length;

		storage.save({
			name,
			description,
			deadline,
			priority,
			createdOn,
			complete,
			type,
			fromProject,
			index
		});
	};

	const createNote = (content) => {
		const type = 'note';
		const createdOn = dateTime.current;
		const index = storage.notes.length;

		storage.save({
			content,
			createdOn,
			type,
			index
		});
	};

	const info = (() => {


		
		return {  }
	})();

export { createProject, createTask, createNote, info };
