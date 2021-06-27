import { createProject, createTask, createNote } from './modules/objects';
import { storage } from './modules/storage';

createTask('testTitle2', 'testDesc2', '10/3/2007', 2);
createTask('testTitle', 'testDesc', '10/3/2006', 1);

const testTask2 = storage.tasks[0];
const testTask = storage.tasks[1];


createProject('Project2', 'This is a description');
storage.projects[0].tasks.push(testTask, testTask2)

//createNote('Note to self', 'Dont fart in public');


console.log(storage.projects[0]);
console.log(storage.projects[0].tasks)
console.log(storage.notes.length === 0 ? 'yes' : 'no');
console.log(storage.notes)

storage.loadArrays();