import { dateTime } from './modules/dateTime';
import { createProject } from './modules/projects';
import { createTask } from './modules/tasks';
import { storage } from './modules/storage';

const testTask2 = createTask('testTitle2', 'testDesc2', '10/3/2007', 2);
const testTask = createTask('testTitle', 'testDesc', '10/3/2006', 1);

createProject('testProject', 'testProject Description', {
	testTask,
	testTask2,
});

createProject('Project2', 'This is a description', { testTask, testTask2 });

console.log(storage.projects[1]);
