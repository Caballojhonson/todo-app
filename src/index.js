import { dateTime } from './modules/dateTime';
import { DOM } from './modules/DOM';
import { logic } from './modules/logic';
import { createProject, createTask, createNote } from './modules/objects';
import { storage } from './modules/storage';
import './style.css';



function makeDummys() {
createTask('testTitle2', 'testDesc2', '10/3/2007', 2);
createTask('testTitle', 'testDesc', '10/3/2006', 1);

const testTask2 = storage.tasks[0];
const testTask = storage.tasks[1];

createProject('third ', 'desc')
createProject('anocher prochecht', 'And the description')
createProject('Project2', 'This is a description');
storage.projects[0].tasks.push(testTask, testTask2)

createNote('Note to self', 'Dont fart in public');
}

function debug() {

// console.log('All projects:');
// console.log(storage.projects);
// console.log('All tasks:');
// console.log(storage.tasks)
// console.log('All notes:');
// console.log(storage.notes);
// console.log('LocalStorage:');
// console.log(window.localStorage);

//console.log(dateTime.thisMonth);


}

setTimeout(() => makeDummys(), 0);
setTimeout(() => debug(), 50)


DOM.nav.renderNav()
DOM.nav.setClock()
DOM.nav.setDate()

