const storage = (() => {
	let projects = [];
	let tasks = [];
	let notes = [];

	const save = (object) => {
		saveInArrays(object.type, object);
		localStore()		
	}

	const saveInArrays = (type, object) => {
		(type === 'project') ? storage.projects.push(object) :
		(type === 'task') ? storage.tasks.push(object) :
		(type === 'note') ? storage.notes.push(object) : 
		console.log('Error saving object');
	}

	const localStore = () => {
		window.localStorage.setItem('project', JSON.stringify(storage.projects));
		window.localStorage.setItem('task', JSON.stringify(storage.tasks));
		window.localStorage.setItem('note', JSON.stringify(storage.notes));
	}


	const loadArrays = () => {

		if (pullAllFromStorage('project') === null) {storage.projects = []}
		else {storage.projects = pullAllFromStorage('project');}

		if (pullAllFromStorage('task') === null) {storage.tasks = []}
		else {storage.tasks = pullAllFromStorage('task');}
		
		if (pullAllFromStorage('note') === null) {storage.notes = []}
		else {storage.notes = pullAllFromStorage('note');}
	}

	const pullAllFromStorage = (type) => {
		const parsed = JSON.parse(window.localStorage.getItem(type));
		return parsed;
	};

	const deleteObject = (type, index) => {
		(type === 'project') ? storage.projects.splice(index, 1) :
		(type === 'task') ? storage.tasks.splice(index, 1) :
		(type === 'note') ? storage.notes.splice(index, 1) : 
		console.log('Error removing object');
		localStore();
	}
	
	return {
		projects,
		tasks,
		notes,
		save,
		localStore,
		loadArrays,
		deleteObject,
	};
})();

export { storage };
