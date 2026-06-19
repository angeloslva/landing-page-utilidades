// Seleção dos elementos no início
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';

    const emptyState = document.querySelector('#empty-state');
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const left = document.createElement('div');
        left.className = 'task-left';

        const span = document.createElement('span');
        span.className = 'task-text' + (task.done ? ' completed' : '');
        span.textContent = task.text;

        left.appendChild(span);

        const right = document.createElement('div');

        const concludeBtn = document.createElement('button');
        concludeBtn.className = 'btn-small conclude';
        concludeBtn.textContent = task.done ? 'Desfazer' : 'Concluir';
        concludeBtn.dataset.index = index;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-small delete';
        deleteBtn.textContent = 'Excluir';
        deleteBtn.dataset.index = index;

        right.appendChild(concludeBtn);
        right.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(right);

        taskList.appendChild(li);

        // O botão 'Concluir' é o único que alterna o estado; removido checkbox

        concludeBtn.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.dataset.index);
            toggleTask(idx);
        });

        deleteBtn.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.dataset.index);
            deleteTask(idx);
        });
    });
}

function addTask(text) {
    const newTask = { text: text.trim(), done: false };
    if (!newTask.text) return;
    tasks.push(newTask);
    renderTasks();
}

function toggleTask(index) {
    if (index < 0 || index >= tasks.length) return;
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function deleteTask(index) {
    if (index < 0 || index >= tasks.length) return;
    tasks.splice(index, 1);
    renderTasks();
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = taskInput.value;
    addTask(value);
    taskInput.value = '';
    taskInput.focus();
});

// Render inicial (lista vazia)
renderTasks();