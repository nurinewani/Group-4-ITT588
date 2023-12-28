//navigation on same page
document.getElementById("defaultOpen").click();
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

//function add task
function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    const task = {
        title,
        description,
        dueDate,
        priority,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('taskForm').reset();
    updateTaskList();
}

//function modify@update task
function updateTaskList() {
    const taskList = document.getElementById('taskList');
taskList.innerHTML = '';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach((task, index) => {
    const taskItem = document.createElement('tr');
    taskItem.classList.add('task-item');
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task));
    checkboxCell.appendChild(checkbox);

    const detailsContainer = document.createElement('td');

    const titleLabel = document.createElement('label');
    titleLabel.textContent = `Title: ${task.title}`;

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = `Description: ${task.description}`;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = `Due Date: ${task.dueDate}`;

    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = `Priority: ${task.priority}`;

    detailsContainer.appendChild(titleLabel);
    detailsContainer.appendChild(descriptionLabel);
    detailsContainer.appendChild(dueDateLabel);
    detailsContainer.appendChild(priorityLabel);

    const buttonsCell = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn');
    editButton.addEventListener('click', () => editTask(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.addEventListener('click', () => deleteTask(index));

    buttonsCell.appendChild(editButton);
    buttonsCell.appendChild(deleteButton);

    taskItem.appendChild(checkboxCell);
    taskItem.appendChild(detailsContainer);
    taskItem.appendChild(buttonsCell);

    taskList.appendChild(taskItem);
});

}

//function tick complete task
function toggleTaskCompletion(task) {
    task.completed = !task.completed;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(t => t.title === task.title);
    tasks[index] = task;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
}

//fuction to allow edit task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = tasks[index];

    document.getElementById('title').value = taskToEdit.title;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('dueDate').value = taskToEdit.dueDate;
    document.getElementById('priority').value = taskToEdit.priority;

    // Remove the task being edited from the tasks array
    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
}

//fuction to delete or remove task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
}

updateTaskList();

//function filter based on priority status
function filterTasks() {
    const filterValue = document.getElementById('priorityFilter').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = filterValue === 'all' ? tasks : tasks.filter(task => task.priority === filterValue);

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('tr');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task));
        checkboxCell.appendChild(checkbox);

        const detailsContainer = document.createElement('td');

        const titleLabel = document.createElement('label');
        titleLabel.textContent = `Title: ${task.title}`;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = `Description: ${task.description}`;

        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = `Due Date: ${task.dueDate}`;

        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = `Priority: ${task.priority}`;

        detailsContainer.appendChild(titleLabel);
        detailsContainer.appendChild(descriptionLabel);
        detailsContainer.appendChild(dueDateLabel);
        detailsContainer.appendChild(priorityLabel);

        const buttonsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => deleteTask(index));

        buttonsCell.appendChild(editButton);
        buttonsCell.appendChild(deleteButton);

        taskItem.appendChild(checkboxCell);
        taskItem.appendChild(detailsContainer);
        taskItem.appendChild(buttonsCell);

        taskList.appendChild(taskItem);
    });
}