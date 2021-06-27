import { dateTime } from "./dateTime";
import { storage } from "./storage";

const createProject = (name, description, tasks) => {

    const createdOn = dateTime.current;

	const project = { name, description, tasks, createdOn };
	storage.localStore('project', project);
    storage.pullSavedProjects();

	return { name, description, tasks, createdOn };
};



export { createProject };
