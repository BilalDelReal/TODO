let todo = [
    {
        id: 1,
        task: "Comprar el pan",
        isDone: false
    },
    {
        id: 2,
        task: "Programar",
        isDone: true
    }
]

showTasks(todo)
dragAndDrop()
let numItems = document.getElementById("items")
let inputNewTask = document.getElementById("inputNewTask");
let containerNewTask = document.getElementById("container")
let clearComplted = document.getElementById("clearCompleted")
let activeTask = document.getElementById("active");
let completedTask = document.getElementById("completed");
let all = document.getElementById("all");
toggleCheck()
all.addEventListener("click", function () {
    let completed = document.getElementById("all")
    let active = document.getElementById("active")
    removeAll()
    showTasks(todo)
    all.classList.add("selected")
    completedTask.classList.remove("selected")
    active.classList.remove("selected")
    toggleCheck()
})

clearComplted.addEventListener("click", () => {
    let tasksDone = getTaskDone()
    for (let i = 0; i < tasksDone.length; i++) {
        let task = tasksDone[i]
        let id = task.id
        let divToDelete = document.querySelector(`[data-id="id-${id}"]`);
        let index = todo.indexOf(task)
        divToDelete.remove()
        todo.splice(index, 1)
    }

    if (tasksDone.length > 0) {
        tasksDone.splice(0, tasksDone.length)
        console.log(tasksDone)

    }


    console.log(todo)
})
inputNewTask.addEventListener("keydown", (e) => {
    if (todo.length > 0) {
        let newId = todo[todo.length - 1].id + 1
        let newTask = {
            id: newId,
            task: inputNewTask.value,
            isDone: false
        }
        if (e.key === "Enter") {
            todo.push(newTask)
            addTask(todo)
            let activTasks = getTasToDo()
            numItems.innerText = activTasks.length;
        }
    } else {
        let newId = 1
        let newTask = {
            id: newId,
            task: inputNewTask.value,
            isDone: false
        }
        if (e.key === "Enter") {
            todo.push(newTask)
            addTask(todo)
            let activTasks = getTasToDo()
            numItems.innerText = activTasks.length;

        }
    }
    toggleCheck()
    dragAndDrop()

})
containerNewTask.addEventListener("click", (e) => {
    let target = e.target;

    if (target.name === "delete" || target.id === "cross") {
        removeTask(target.parentElement.getAttribute("data-id"))

        target.parentElement.parentElement.remove()
    }
    let activTasks = getTasToDo()
    numItems.innerText = activTasks.length;
})
activeTask.addEventListener("click", () => {
    let all = document.getElementById("all")
    let completed = document.getElementById("completed")
    removeAll()
    let taskToDo = getTasToDo()

    showTasks(taskToDo)

    activeTask.classList.add("selected")
    all.classList.remove("selected")
    completed.classList.remove("selected")
    toggleCheck()
})
completedTask.addEventListener("click", () => {
    let all = document.getElementById("all")
    let active = document.getElementById("active")
    removeAll()
    let taskCompleted = getTaskDone()


    showTasks(taskCompleted)

    completedTask.classList.add("selected")
    all.classList.remove("selected")
    active.classList.remove("selected")
    toggleCheck()
})


function toggleCheck() {
    let checkboxes = document.querySelectorAll('.input')
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function () {
            let tasktodo = getTasToDo()
            let taskdone = getTaskDone()
            if (checkbox.checked) {
                checkbox.nextSibling.classList.add("checked")
                checkbox.nextSibling.classList.remove("text-Light-Grayish-Blue-darktheme")
                for (let i = 0; i < tasktodo.length; i++) {
                    if (tasktodo[i].id === Number(checkbox.id)) {
                        let index = todo.indexOf(tasktodo[i])
                        todo[index].isDone = true;
                    }

                }


            } else {
                if (todo.length > 0) {

                    checkbox.nextSibling.classList.remove("checked")
                    checkbox.nextSibling.classList.add("text-Light-Grayish-Blue-darktheme")
                    for (let i = 0; i < taskdone.length; i++) {
                        if (taskdone[i].id === Number(checkbox.id)) {
                            let index = todo.indexOf(taskdone[i])
                            todo[index].isDone = false;
                        }

                    }
                }


            }
        })
    })
}

function getTaskDone() {
    let tasksDone = []
    for (let i = 0; i < todo.length; i++) {
        let item = todo[i]

        if (item.isDone) {

            tasksDone.push(item)
        }

    }
    return tasksDone
}

function getTasToDo() {
    let taskToDo = []
    for (let i = 0; i < todo.length; i++) {
        let item = todo[i]

        if (!item.isDone) {
            taskToDo.push(item)
        }


    }

    return taskToDo
}

function removeAll() {
    let allDiv = document.querySelectorAll('#div-task')
    for (let i = 0; i < allDiv.length; i++) {
        allDiv[i].remove()
    }

}

function showTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {

        let container = document.querySelector('#container')
        let divNewTask = document.createElement("div")
        let checkboxNewTask = document.createElement("input")
        let textNewTask = document.createElement("label")
        checkboxNewTask.type = "checkbox"
        checkboxNewTask.className = "chekbox input"
        textNewTask.className = "text-new-task"
        divNewTask.className = "div-new-task div-task"
        divNewTask.append(checkboxNewTask)
        divNewTask.append(textNewTask)
        let task = tasks[i]
        checkboxNewTask.id = task.id
        divNewTask.id = "div-task"
        textNewTask.setAttribute("for", task.id)
        divNewTask.setAttribute("data-id", `id-${task.id}`)
        textNewTask.innerText = task.task
        if (task.isDone) {
            checkboxNewTask.setAttribute("checked", "checked")
            textNewTask.classList.add("checked")
            textNewTask.classList.remove("text-Light-Grayish-Blue-darktheme")
        }
        container.append(divNewTask)
        let cross = document.createElement("div")
        cross.className = "mr-3 cursor-pointer select-none cross"
        cross.innerHTML = "<img id='cross' src='images/icon-cross.svg' alt='Cross'>"
        divNewTask.append(cross)
        let crossImg = document.getElementById("cross")
        crossImg.setAttribute("data-id", task.id)
        cross.setAttribute("data-id", task.id)
        cross.setAttribute("name", "delete")


    }

}

function addTask(task) {
    let container = document.querySelector('#container')
    let divNewTask = document.createElement("div")
    let checkboxNewTask = document.createElement("input")
    let textNewTask = document.createElement("label")
    checkboxNewTask.type = "checkbox"
    checkboxNewTask.className = "chekbox input"
    textNewTask.className = "text-new-task"
    divNewTask.className = "div-new-task div-task"
    divNewTask.append(checkboxNewTask)
    divNewTask.append(textNewTask)

    let lastId = task[task.length - 1].id
    divNewTask.id = "div-task"
    checkboxNewTask.id = lastId
    textNewTask.setAttribute("for", lastId)
    divNewTask.setAttribute("data-id", `id-${lastId}`)
    textNewTask.innerText = task[task.length - 1].task
    container.append(divNewTask)
    numItems.innerText = task.length;
    let cross = document.createElement("div")
    cross.className = "mr-3 cursor-pointer select-none cross"
    cross.innerHTML = "<img id='cross' src='images/icon-cross.svg' alt='Cross'>"
    divNewTask.append(cross)
    let crossImg = document.getElementById("cross")
    crossImg.setAttribute("data-id", lastId)
    cross.setAttribute("data-id", lastId)
    cross.setAttribute("name", "delete")

}

function removeTask(id) {
    for (let i = 0; i < todo.length; i++) {
        let task = todo[i]
        let numId = Number(id)
        if (task.id === numId) {
            todo.splice(i, 1)
        }
    }

}

function dragAndDrop(){
    const draggables = document.querySelectorAll("#div-task")
    const container = document.querySelector('#container')
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart",()=>{
            draggable.classList.add("dragging")
        })
        container.addEventListener("dragend", ()=>{
            draggable.classList.remove("dragging")
        })
    })

    container.addEventListener("dragover", (e)=>{
        e.preventDefault()
        const draggable = document.querySelector(".dragging")
        container.append(draggable)
    })
}

let activTasks = getTasToDo()
numItems.innerText = activTasks.length;
