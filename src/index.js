import { closestIndexTo, parse, parseISO } from 'date-fns';
import { dateTime } from './modules/dateTime';
import { DOM } from './modules/DOM';
import { logic } from './modules/logic';
import { createProject, createTask, createNote, info } from './modules/objects';
import { storage } from './modules/storage';
import './style.css';

function makeDummys() {
	createTask('Poop in the barrel', 'Take ass. Take barrel to basement. Make poop in the barrel. Show mom.', '07/30/2021', 5)
	createTask('Make love to goat', 'As usual', '07/03/2021', 2);
	createTask('Caress nipples in the dark wearing the tutu', 'testDesc', '07/16/2021', 1);
	createTask(
		'Throw shit to window',
		'Just poop on your hand, throw against the nearest window',
		'08/25/2021',
		5
	);

	createTask(
		'Disguise as mage',
		'Try to be a wizard to make new friends. Poop on their bellies.',
		'12/5/2021',
		3
	);
	createTask(
		'Become gay person',
		'Buy ponies, dress pink, poop in their mouths',
		'06/15/2022',
		4
	);

	const testTask2 = storage.tasks[0];
	const testTask = storage.tasks[1];

	createProject('third ', 'desc');
	createProject('anocher prochecht', 'And the description');
	createProject('Project2', 'This is a description');
	storage.projects[0].tasks.push(testTask, testTask2);

	createNote('Dont fart in public');
	createNote('I dont know what to dummy here so here goes this and nothing else')
}

setTimeout(() => dateTime.getTimeToUpcomingDeadlines(), 5000) 

function debug() {
console.log(logic.sortByDeadline());
console.log(new Date('September 2021'));
}

setTimeout(() => makeDummys(), 0);
setTimeout(() => debug(), 50);

DOM.nav.renderNav();
DOM.nav.setClock();
DOM.nav.setDate();
setTimeout(() => DOM.overview.renderUpcoming(), 0) 
setTimeout(() => DOM.overview.renderPending(), 0) 
setTimeout(() => DOM.calendar.renderCalendar(dateTime.generateCalendar(new Date())), 0) 
