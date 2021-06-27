const storage = (() => {
	const projects = [];

	const pullSavedProjects = () => {
		projects.push(getFromStorage('project'));
	};

	const localStore = (type, object) => {
		window.localStorage.setItem(type, JSON.stringify(object));
	};
	//Add index to parameters so you can choose which to pull??
	const getFromStorage = (type) => {
		const parsed = JSON.parse(window.localStorage.getItem(type));
		return parsed;
	};

	return { localStore, getFromStorage, pullSavedProjects, projects };
})();

export { storage };
