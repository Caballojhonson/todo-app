const storage = (() => {

	let projects = [];
	let tasks = [];
	let notes = [];


	const localStore = (type, object) => {
		window.localStorage.setItem(type, JSON.stringify(object));
	};

	//Add index to parameters so you can choose which to pull??
	const pullAllFromStorage = (type) => {
		const parsed = JSON.parse(window.localStorage.getItem(type));
		return parsed;
	};

	const save = (object) => {

		localStore(object.type, object);
		saveInArrays(object.type, object)
	}

	const saveInArrays = (type, object) => {
		
		type === 'project' ? projects.push(object) :
		type === 'task' ? tasks.push(object) :
		type === 'note' ? notes.push(object) : 
		console.log('Error saving object');
		
	}

	const loadArrays = () => {
		if (projects.length === 0) {
			projects.push(pullAllFromStorage('project'))
		}
		if (tasks.length === 0) {
			tasks.push(pullAllFromStorage('task'))
		}
		if (notes.length === 0) {
			notes.push(pullAllFromStorage('note'))
		}

	}

	return {
		projects,
		tasks,
		notes,
		save,
		loadArrays
	};
})();

export { storage };
