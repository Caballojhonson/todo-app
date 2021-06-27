import { tasks, projects } from './modules/objects';
import { storage } from './modules/storage';

const testTask2 = tasks.createTask('testTitle2', 'testDesc2', '10/3/2007', 2);
const testTask = tasks.createTask('testTitle', 'testDesc', '10/3/2006', 1);


projects.createProject('Project2', 'This is a description');

//storage.projects[0].pendingTasks.push(testTask2, testTask);

console.log(storage.projects[0].completed ? 'YEAAH' : 'FUCK YOU!');
