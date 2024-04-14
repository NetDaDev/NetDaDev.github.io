document.addEventListener("DOMContentLoaded", function () {
    let taskInput = document.getElementById("task-box");
    let addBtn = document.getElementById("add-button");
    let todoList = document.getElementById("todo-list");
    let emptyListMessage = document.getElementById("empty-list");

    loadTasks();

    addBtn.addEventListener("click", function () {
        let task = taskInput.value.trim();

        if (task !== "") {
            addTaskToLocalStorage(task);
            addTaskToList(task);
            taskInput.value = "";
        }
    });

    function addTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks && tasks.length > 0) {
            tasks.forEach(task => {
                addTaskToList(task);
            });
        } else {
            showEmptyListMessage();
        }
    }

    function addTaskToList(task) {
        let li = document.createElement("li");
        li.classList.add("task");

        // Create task text element
        let taskText = document.createElement("span");
        taskText.textContent = task;
        li.appendChild(taskText);

        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            removeTaskFromLocalStorage(task);
            todoList.removeChild(li);
            if (todoList.childNodes.length === 0) {
                showEmptyListMessage();
            }
        });
        li.appendChild(deleteBtn);

        // Append task to todo list
        todoList.appendChild(li);

        if (todoList.childNodes.length > 0) {
            hideEmptyListMessage();
        }
    }


    function showEmptyListMessage() {
        emptyListMessage.style.display = "block";
    }

    function hideEmptyListMessage() {
        emptyListMessage.style.display = "none";
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(item => item !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
