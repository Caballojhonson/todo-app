
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

	const createTask = (name, description, deadline, priority) => {
		const type = 'task';
		const createdOn = dateTime.current;
		const complete = false;
		const fromProject = 'Dummy Project';

		storage.save({
			name,
			description,
			deadline,
			priority,
			createdOn,
			complete,
			type,
			fromProject
		});
	};

	const createNote = (content) => {
		const type = 'note';
		const createdOn = dateTime.current;

		storage.save({
			content,
			createdOn,
			type
		});
	};

	const info = (() => {


		
		return {  }
	})();

export { createProject, createTask, createNote, info };
