import statsIcon from '../icons/stats.png';
import calendarIcon from '../icons/calendar.png';
import projectsIcon from '../icons/project.png';
import notesIcon from '../icons/note.png';
import editIcon from '../icons/edit.png';
import addIcon from '../icons/add.png';
import leftIcon from '../icons/left.png';
import rightIcon from '../icons/right.png';
import { dateTime } from './dateTime';
import { logic } from './logic';
import { formatDistanceStrict } from 'date-fns';
import { storage } from './storage';

function getAll(selector) {
	return document.querySelectorAll(selector);
}
function get(id) {
	return document.getElementById(id);
}

function createText(tag, clss, text, appendTo) {
	let elem = document.createElement(tag);
	elem.classList.add(clss);
	elem.textContent = text;
	appendTo.appendChild(elem);
	return elem;
}

function createDiv(clss, appendTo) {
	let elem = document.createElement('div');
	elem.classList.add(clss);
	appendTo.appendChild(elem);
	return elem;
}

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
			let container = get('upcomingContainer');
			for (let i = 0; i < logic.getUpcomingTasks().length; i++) {
				let box = createDiv('boxes', container);

				let priorityBox = createDiv('priorityCircles', box);
				priorityBox.textContent = logic.getUpcomingTasks()[i].priority;
				logic.changePriorityColor(logic.getUpcomingTasks()[i], priorityBox);

				let textContainer = createDiv('upcomingTextContainer', box);

				createText(
					'h6',
					'timeTill',
					logic.dueOrOverdue(
						logic.getUpcomingTasks()[i].deadline,
						dateTime.getTimeToUpcomingDeadlines()[i]
					),
					box
				);
				createText(
					'h4',
					'fromProject',
					logic.getUpcomingTasks()[i].fromProject,
					textContainer
				);
				createText(
					'h5',
					'taskTitle',
					logic.getUpcomingTasks()[i].name,
					textContainer
				);
			}
		};

		const renderPending = () => {
			const pendingContainer = get('pendingContainer');
			const completeContainer = get('completeContainer');

			createText(
				'h5',
				'pendingTasks',
				`${logic.countStats().pendingTaskCount} Tasks`,
				pendingContainer
			);
			createText(
				'h5',
				'pendingprojects',
				`${logic.countStats().pendingProjectCount} Projects`,
				pendingContainer
			);

			createText(
				'h5',
				'pendingTasks',
				`${logic.countStats().completedTaskCount} Tasks`,
				completeContainer
			);
			createText(
				'h5',
				'pendingTasks',
				`${logic.countStats().completedProjectCount} Projects`,
				completeContainer
			);
		};
		return { renderUpcoming, renderPending };
	})();

	const calendar = (() => {
		const monthContainer = get('monthContainer');
		const left = get('previousMonth');
		const month = get('month');
		const right = get('nextMonth');

		left.src = leftIcon;
		month.textContent = `${dateTime.thisMonth.monthAndYear}`;
		right.src = rightIcon;

		const renderCalendar = (dayArray) => {
			const calendar = get('calendar');
			calendar.innerHTML = '';

			for (let i = 0; i < dayArray.length; i++) {
				let cell = document.createElement('div');
				cell.classList.add('calendarCell');
				cell.id = i;
				cell.textContent = dayArray[i];
				calendar.appendChild(cell);
			}
		};

		left.addEventListener('click', () => {
			let currentMonth = month.textContent;
			month.textContent = dateTime.substractMonth(currentMonth);
			currentMonth = month.textContent;
			renderCalendar(dateTime.generateCalendar(currentMonth));
		});

		right.addEventListener('click', () => {
			let currentMonth = month.textContent;
			month.textContent = dateTime.addMonth(currentMonth);
			currentMonth = month.textContent;
			renderCalendar(dateTime.generateCalendar(currentMonth));
		});

		return { renderCalendar };
	})();

	const navigation = (() => {
		const statsBtn = get('statsIcon');
		const calendarBtn = get('calendarIcon');
		const projectsBtn = get('projectsIcon');
		const notesBtn = get('notesIcon');

		const statsView = get('overview');
		const calendarView = get('calendarView');
		const projectsView = get('projectsView');
		const notesView = get('notesView');

		function hideAllViews() {
			statsView.style.display = 'none';
			calendarView.style.display = 'none';
			projectsView.style.display = 'none';
			notesView.style.display = 'none';
		}

		statsBtn.addEventListener('click', () => {
			hideAllViews();
			statsView.style.display = 'flex';
		});

		calendarBtn.addEventListener('click', () => {
			hideAllViews();
			calendarView.style.display = 'flex';
		});

		projectsBtn.addEventListener('click', () => {
			hideAllViews();
			projectsView.style.display = 'flex';
		});

		notesBtn.addEventListener('click', () => {
			hideAllViews();
			notesView.style.display = 'flex';
		});
	})();

	return { nav, overview, calendar };
})();

export { DOM };
