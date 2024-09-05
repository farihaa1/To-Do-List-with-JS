let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTasksList();
        updateStates();
    }
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStates();
}

const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStates();
}

const editTask = (index)=>{
    const taskInput = document.getElementById("taskInput")
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateStates();
}

const updateStates = ()=>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks= tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerHTML = `${completeTasks}/${totalTasks}`
}

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class = "taskItem">
            <div class="task ${task.completed ? 'completed':''}">
              <input type="checkbox" class="checkbox" ${task.completed ? "checked" :""} name="" id=""/>
             <p>${task.text}</p>
            </div>

            <div class="icons">
                <i class="fa-regular fa-pen-to-square""></i>
                <i class="fa-solid fa-delete-left "></i>
            </div>


           
        </div>
        `;

        listItem.querySelector('.fa-pen-to-square').addEventListener('click', () => {
            editTask(index);
        });
        
        listItem.querySelector('.fa-delete-left').addEventListener('click', () => {
            deleteTask(index);
        });


        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    })
}
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();


    addTask();
});