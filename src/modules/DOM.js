import statsIcon from '../icons/stats.png';
import calendarIcon from '../icons/calendar.png';
import projectsIcon from '../icons/project.png';
import notesIcon from '../icons/note.png';
import editIcon from '../icons/edit.png';
import deleteIcon from '../icons/delete.png';
import addIcon from '../icons/add.png';
import leftIcon from '../icons/left.png';
import rightIcon from '../icons/right.png';
import cancelIcon from '../icons/cancelCircle.png';
import checkIcon from '../icons/checkCircle.png';
import { dateTime } from './dateTime';
import { logic } from './logic';
import { storage } from './storage';
import { createProject, createTask } from './objects';
import { add } from 'date-fns';

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
	// NAVBAR

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

	//	OVERVIEW

	const overview = (() => {
		const renderUpcoming = () => {
			let container = get('upcomingContainer');
			container.innerHTML = '';

			for (let i = 0; i < logic.getUpcomingTasks().length; i++) {
				let box = createDiv('boxes', container);

				let priorityBox = createDiv('priorityCircles', box);
				priorityBox.textContent = logic.getUpcomingTasks()[i].priority;
				logic.setPriorityCircleColor(logic.getUpcomingTasks()[i], priorityBox);

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
			pendingContainer.innerHTML = '';
			completeContainer.innerHTML = '';

			createText('h4', 'overview', 'Pending', pendingContainer);
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
			createText('h4', 'overview', 'Complete', completeContainer);

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

	//CALENDAR

	const calendar = (() => {
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
				cell.id = i + 1;
				cell.textContent = dayArray[i];
				calendar.appendChild(cell);
			}

			const calendarCells = document.querySelectorAll('.calendarCell');

			for (let i = 0; i < calendarCells.length; i++) {
				calendarCells[i].addEventListener('click', (e) => {
					renderCalendarTasks(e.target.id);
					resetCellStyles();
					styleDeadlineDays();
					highlightCell(e.target.id);
				});
			}
			styleDeadlineDays();
		};

		const styleDeadlineDays = () => {
			let days = getAll('.calendarCell');

			for (let i = 0; i < days.length; i++) {
				if (logic.dayHasDeadline(`${days[i].id} ${month.textContent}`)) {
					let priorityNum = logic.getHighestPriority(
						`${days[i].id} ${month.textContent}`
					);
					let dayToStyle = get(days[i].id);
					dayToStyle.style.borderColor = logic.getPriorityColor(priorityNum);
					dayToStyle.style.borderWidth = '3px';
				}
			}
		};

		const highlightCell = (id) => {
			const cell = get(id);
			cell.style.border = '3px solid black';
			cell.style.backgroundColor = 'RGB(204, 254, 255)';
		};

		const resetCellStyles = (id) => {
			const cells = getAll('.calendarCell');
			for (let i = 0; i < cells.length; i++) {
				cells[i].style.border = '1px solid darkgray';
				cells[i].style.backgroundColor = 'white';
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

		//CALENDAR TASK SECTION

		const renderCalendarTasks = (dayId) => {
			const getDate = (id) => {
				let day = parseInt(id);
				let date = `${day} ${month.textContent}`;
				return date;
			};

			let date = getDate(dayId);
			const taskArray = logic.getTasksForDay(date);

			const container = get('calendarTaskContainer');
			container.innerHTML = '';

			for (let i = 0; i < taskArray.length; i++) {
				const projectTitle = taskArray[i][0];
				const task = taskArray[i][1];

				const taskCard = createDiv('calendarTask', container);
				const timeTillBox = createDiv('timeTillBox', taskCard);

				const priorityCircle = createDiv('priorityCircles', taskCard);
				priorityCircle.classList.add('calendarPriorities');
				priorityCircle.textContent = logic.getUpcomingTasks()[i].priority;
				logic.setPriorityCircleColor(
					logic.getUpcomingTasks()[i],
					priorityCircle
				);

				createText(
					'h5',
					'calendarTaskTimeTill',
					`${logic.dueOrOverdue(
						task.deadline,
						dateTime.timeTill(task.deadline)
					)}`,
					timeTillBox
				);

				createText('h4', 'calendarProjectTitle', `${projectTitle}`, taskCard);
				createText('h5', 'calendarTaskTitle', `${task.name}`, taskCard);
				createText(
					'h6',
					'calendarTaskDescription',
					`${task.description}`,
					taskCard
				);
			}
		};

		return { renderCalendar, renderCalendarTasks };
	})();

	// PROJECTS

	const projects = (() => {
		const renderProjects = () => {
			const addBtn = get('newProjectBtn');
			addBtn.src = addIcon;
			const container = get('projectContainer');
			container.innerHTML = '';

			for (let i = 0; i < storage.projects.length; i++) {
				const card = createDiv('projectCard', container);
				card.id = storage.projects[i].index;

				createText('h4', 'projectTitle', `${storage.projects[i].name}`, card);
				createText(
					'h5',
					'projectDate',
					`${storage.projects[i].createdOn.day}`,
					card
				);

				createText(
					'h6',
					'projectDescription',
					`${storage.projects[i].description}`,
					card
				);
				createText(
					'h4',
					'completedPercentage',
					logic.generateProjectCompletionText(storage.projects[i], i),
					card
				);
				createDiv('progressBarRed', card);
				let progressBar = createDiv('progressBarGreen', card);
				progressBar.style.width = `${logic.getCompletionPercent(
					storage.projects[i]
				)}`;

				// PROJECTCARD BUTTONS

				let btnsContainer = createDiv('projectCardBtnContainer', card);
				let deleteBtn = new Image();
				deleteBtn.src = deleteIcon;
				deleteBtn.classList.add('deleteBtn');

				let editBtn = new Image();
				editBtn.src = editIcon;
				editBtn.classList.add('editBtn');

				btnsContainer.appendChild(deleteBtn);
				btnsContainer.appendChild(editBtn);
				let addTaskBtn = createText('h3', 'addTask', 'Add Task', btnsContainer);

				deleteBtn.addEventListener('click', (e) => {
					logic.removeItem(
						'project',
						e.target.parentNode.parentNode.id,
						storage.projects
					);
					renderProjects();
				});

				addTaskBtn.addEventListener('click', (e) => {
					eventHandling.displayTaskPopup(e);
					eventHandling.populateDate();
				});

				editBtn.addEventListener('click', (e) => {
					let project = storage.projects[e.target.parentNode.parentNode.id];
					edit(project);
				});

				//	TASKCARD SECTION

				const cardsContainer = createDiv('projectTaskContainer', card);
				for (let c = 0; c < storage.projects[i].tasks.length; c++) {
					const taskCard = createDiv('projectTaskCard', cardsContainer);

					if (storage.projects[i].tasks[c].complete) {
						console.log(storage.projects[i].tasks[c].complete);
						taskCardTitle.style.textDecoration = 'line-through';
						let checkLogo = new Image();
						checkLogo.src = checkIcon;
						checkLogo.classList.add('checkLogo');
						taskCard.appendChild(checkLogo);
					} else if (storage.projects[i].tasks[c].complete === false) {
						let crossLogo = new Image();
						crossLogo.src = cancelIcon;
						crossLogo.classList.add('completeLogo');
						taskCard.appendChild(crossLogo);
					}

					const taskCardTitle = createText(
						'h5',
						'projectTaskCardName',
						`${storage.projects[i].tasks[c].name}`,
						taskCard
					);
				}
			}
		};

		return { renderProjects };
	})();

	// EDIT

	const edit = (project) => {
		const addNewProjectIcon = get('newProjectBtn');
		const formPopup = get('newProjectPopup');
		const formTitle = get('newProjectTitle');
		const nameInput = get('projectTitleInput');
		const descriptionInput = get('projectDescInput');
		const btnsContainer = get('btnsContainer');
		const addProjectBtn = get('addNewProject');

		const editProject = () => {
			project.name = nameInput.value;
			project.description = descriptionInput.value;
			storage.localStore();
		};

		const displayEditForm = () => {
			formTitle.textContent = `Edit project`;

			if (document.getElementById('formEditBtn') === null) {
				const formEditBtn = createDiv(`addBtn`, btnsContainer);
				formEditBtn.classList.add('formBtn');
				formEditBtn.id = 'formEditBtn';
				formEditBtn.textContent = 'EDIT';
			} else {
				document.getElementById('formEditBtn').style.display = 'block';
			}

			addProjectBtn.style.display = 'none';
			formPopup.style.display = 'flex';
			addNewProjectIcon.style.display = 'none';
		};

		const resetForm = () => {
			formTitle.textContent = 'New project';
			addProjectBtn.style.display = 'block';
			document.getElementById('formEditBtn').style.display = 'none';
			nameInput.value = '';
			descriptionInput.value = '';
			addNewProjectIcon.style.display = 'block';
			formPopup.style.display = 'none';
		};

		displayEditForm();

		document.getElementById('formEditBtn').addEventListener('click', finalFunction)
			

		function finalFunction() {
			editProject();
			storage.localStore();
			resetForm();
			projects.renderProjects();
			document.getElementById('formEditBtn').removeEventListener('click', finalFunction);
		}

		
	};

	//	TASKS

	const tasks = (() => {
		const addBtn = get('addNewTask');
		const nameInput = get('taskTitleInput');
		const dueDateInput = get('dueDateInput');
		const descriptionInput = get('taskDescInput');

		const addNewTask = () => {
			const projectId = get('newTaskForm').firstChild.nextSibling.id;
			const name = nameInput.value;
			const dueDate = dueDateInput.value;
			const description = descriptionInput.value;
			const fromProject = storage.projects[projectId].name;

			const isChecked = () => {
				let circles = getAll('.formCircles');
				for (let i = 0; i < circles.length; i++) {
					if (circles[i].style.border === '2px solid black') {
						return circles[i].textContent;
					}
				}
				return 1;
			};

			createTask(
				`${name}`,
				`${description}`,
				`${dueDate}`,
				`${isChecked()}`,
				`${fromProject}`
			);

			storage.projects[projectId].tasks.push(
				storage.tasks[storage.tasks.length - 1]
			);

			storage.localStore();
			projects.renderProjects();
			overview.renderUpcoming();
			overview.renderPending();
			calendar.renderCalendar(dateTime.generateCalendar(new Date()));
		};

		addBtn.addEventListener('click', () => {
			addNewTask();
			const taskFormPopup = get('newTaskPopup');
			taskFormPopup.style.display = 'none';
			newProjectBtn.style.display = 'block';
			nameInput.value = '';
			descriptionInput.value = '';
			eventHandling.resetBorders();
		});
		return {};
	})();

	// NAV BUTTON HANDLERS

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

	//	EVENT HANDLERS

	const eventHandling = (() => {
		// DISPLAY PROJECT FORM
		const newProjectBtn = get('newProjectBtn');
		newProjectBtn.addEventListener('click', () => {
			const popup = get('newProjectPopup');
			popup.style.display = 'flex';
			newProjectBtn.style.display = 'none';
		});

		// HIDE FORMS ON CANCEL OR MODAL CLICK

		window.onclick = (e) => {
			let projectModal = get('newProjectPopup');
			let projectCancelBtn = get('cancelNewProject');
			let taskModal = get('newTaskPopup');
			let taskCancelBtn = get('cancelNewTask');
			if (e.target == projectModal || e.target == projectCancelBtn) {
				projectModal.style.display = 'none';
				newProjectBtn.style.display = 'block';
			}
			if (e.target == taskModal || e.target == taskCancelBtn) {
				taskModal.style.display = 'none';
				newProjectBtn.style.display = 'block';
			}
		};

		//	DISPLAY TASK FORM

		const displayTaskPopup = (e) => {
			const taskFormPopup = get('newTaskPopup');
			let form = get('newTaskForm');
			let formTitle = form.firstChild.nextSibling;
			taskFormPopup.style.display = 'flex';
			newProjectBtn.style.display = 'none';
			formTitle.id = e.target.parentNode.parentNode.id;
		};

		// ADD NEW PROJECT

		const addNewProject = get('addNewProject');
		addNewProject.addEventListener('click', () => {
			createProject(
				get('projectTitleInput').value,
				get('projectDescInput').value
			);
			projects.renderProjects();
			console.log(storage.projects);

			let modal = get('newProjectPopup');
			modal.style.display = 'none';
			newProjectBtn.style.display = 'block';
			get('projectTitleInput').value = '';
			get('projectDescInput').value = '';
		});

		// HIGHLIGHT INPUT PRIORITIES

		const priorityCircles = getAll('.formCircles');
		for (let i = 0; i < priorityCircles.length; i++) {
			priorityCircles[i].addEventListener('click', (e) => {
				resetBorders();
				e.target.style.border = '2px solid black';
			});
		}

		function resetBorders() {
			for (let i = 0; i < priorityCircles.length; i++) {
				priorityCircles[i].style.border = '0px solid black';
			}
		}

		// POPULATE DATE

		const populateDate = () => {
			let dateInput = get('dueDateInput');
			dateInput.value = dateTime.current.day;
		};

		return { displayTaskPopup, resetBorders, populateDate };
	})();

	return { nav, overview, calendar, projects };
})();

export { DOM };
