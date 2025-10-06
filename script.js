// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            // Get task text without the "Remove" button text
            const taskText = li.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to create a task element
    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove functionality
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        // Append
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        createTaskElement(taskText);
        saveTasks();

        // Clear input
        taskInput.value = "";
    }

    // Add event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
});
