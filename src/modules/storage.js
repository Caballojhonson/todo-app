const storage = (() => {
	let projects = [];
	let tasks = [];

	const pushProjectsFromStorage = () => {
		projects.push(pullAllFromStorage('project'));
	};

	const pushTasksFromStorage = () => {
		tasks.push(pullAllFromStorage('task'));
	};

	const localStore = (type, object) => {
		window.localStorage.setItem(type, JSON.stringify(object));
	};
	//Add index to parameters so you can choose which to pull??
	const pullAllFromStorage = (type) => {
		const parsed = JSON.parse(window.localStorage.getItem(type));
		return parsed;
	};

	return {
		localStore,
		projects,
		pushProjectsFromStorage,
		pushTasksFromStorage,
	};
})();

export { storage };
