const storage = (() => {
	let projects = [];
	let tasks = [];
	let notes = [];

	const save = (object) => {
		saveInArrays(object.type, object);
		localStore()		
	}

	const saveInArrays = (type, object) => {
		(type === 'project') ? projects.push(object) :
		(type === 'task') ? tasks.push(object) :
		(type === 'note') ? notes.push(object) : 
		console.log('Error saving object');
	}

	const localStore = () => {
		window.localStorage.setItem('project', JSON.stringify(projects));
		window.localStorage.setItem('task', JSON.stringify(tasks));
		window.localStorage.setItem('note', JSON.stringify(notes));
	}


	const loadArrays = () => {
		storage.projects = pullAllFromStorage('project');
		storage.tasks = pullAllFromStorage('task');
		storage.notes = pullAllFromStorage('note');
	}

	//Add index to parameters so you can choose which to pull??
	const pullAllFromStorage = (type) => {
		const parsed = JSON.parse(window.localStorage.getItem(type));
		return parsed;
	};
	
	return {
		projects,
		tasks,
		notes,
		save,
		loadArrays,
	};
})();

export { storage };
