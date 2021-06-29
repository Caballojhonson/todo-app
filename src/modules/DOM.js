import statsIcon from '../icons/stats.png';
import calendarIcon from '../icons/calendar.png';
import projectsIcon from '../icons/project.png';
import notesIcon from '../icons/note.png';
import editIcon from '../icons/edit.png';
import addIcon from '../icons/add.png';
import { dateTime } from './dateTime';
import { logic } from './logic';
import { formatDistanceStrict } from 'date-fns';

function newImage(source) {
	const image = new Image();
	image.src = source;
	image.id = source.toString();

	return image;
}

function getAll(selector) {
	return document.querySelectorAll(selector);
}
function get(id) {
	return document.getElementById(id);
}

function getIdsFromClass(clss) {
	const elements = get(clss);
	const ids = [];
	for (let i = 0; i < elements.length; i++) {
		ids.push(elements[i].id);
	}
	return ids;
}

function createText(tag, clss, text, appendTo) {
	let elem = document.createElement(tag);
	elem.classList.add(clss);
	elem.textContent = text;
	appendTo.appendChild(elem);
    return elem
}

function createDiv(clss, appendTo) {
    let elem = document.createElement('div')
    elem.classList.add(clss)
    appendTo.appendChild(elem);
    return elem
}

function append(what, where) {
	where.appendChild(what);
}
const common = (() => {})();

const DOM = (() => {
	const nav = (() => {
		const renderNav = () => {
			const elements = getAll('.navBtn');
			const sources = [statsIcon, calendarIcon, projectsIcon, notesIcon];
			for (let i = 0; i < sources.length; i++) {
				elements[i].src = sources[i];
			}
		};

		const setClock = () => {
			let clock = get('clock');
			clock.textContent = dateTime.getTime();
			setInterval(() => (clock.textContent = dateTime.getTime()), 1000);
		};

		const setDate = () => {
			let date = get('date');
			date.textContent = `${dateTime.current.day}`;
		};
		return { renderNav, setClock, setDate };
	})();

	const overview = (() => {
		const renderUpcoming = () => {
            let container = get('upcomingCont')
			let box = createDiv('boxes', container)
			for (let i = 0; i < logic.getUpcomingTasks().length; i++) {
				createText(
					'h6',
					'timeTill',
					dateTime.getTimeToUpcomingDeadlines()[i],
					box
				);
			}
		};
		return { renderUpcoming };
	})();

	return { nav, overview };
})();

export { DOM };
