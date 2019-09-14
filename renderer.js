const inputEl = document.querySelector('.header__input')
const buttonInputEl = document.querySelector('.header__button')


const filterEl = document.querySelector('.filter__input')

const filterButton = document.querySelector('.filter__button')
const taskEl = document.querySelector('.tasks')

const tasks = []

inputEl.addEventListener('keyup', e => {
    if (e.keyCode == 13 && e.target.value) {
        tasks.unshift({
            content: e.target.value
        })
        e.target.value = ''
        loadTasks()
    }
})

buttonInputEl.addEventListener('click', e => {
    tasks.unshift({
        content: inputEl.value
    })
    e.target.value = ''
    loadTasks()
})

const filterTasks = tasks => {
    console.log('tasks', tasks);
    return tasks.filter(task => task.content.toLowerCase().includes(filterEl.value.toLowerCase()))
}

filterEl.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        const filteredTasks = filterTasks(tasks)
        console.log(filteredTasks, undefined, 2);
        loadTasks(filteredTasks)

    }
})

filterButton.addEventListener('click', () => {
    const filteredTasks = filterTasks(tasks)
    console.log(filteredTasks, undefined, 2);
    loadTasks()
})

const loadTasks = (filteredTasks) => {
    if (filteredTasks) {
        taskEl.innerHTML = filteredTasks.map((task, index) => `
            <div class="task">
            <div class="task_content">${task.content} </div>
            <button class="task__action" data-index="${index}" onclick="deleteTask(${index})">Delete</div>
            </div>
            `)
        return;
    }
    taskEl.innerHTML = tasks.map((task, index) => `
    <div class="task">
    <div class="task_content">${task.content} </div>
    <button class="task__action" data-index="${index}" onclick="deleteTask(${index})">Delete</div>
    </div>
    `)
}

const deleteTask = (index) => {
    tasks.splice(index, 1)
    loadTasks();
}