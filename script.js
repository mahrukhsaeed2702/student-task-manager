// Student Task Manager - main script

let tasks = [];

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (title === "") {
    return;
  }

  tasks.push({
    id: Date.now(),
    title: title,
    description: descInput.value.trim(),
    completed: false
  });

  form.reset();
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  const query = searchInput.value.trim().toLowerCase();
  const visibleTasks = tasks.filter(function (task) {
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  if (visibleTasks.length === 0) {
    taskList.innerHTML = '<p class="empty">No tasks found.</p>';
    return;
  }

  visibleTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.className = "task-card";

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = "<h3></h3><p></p>";
    info.querySelector("h3").textContent = task.title;
    info.querySelector("p").textContent = task.description;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });
    actions.appendChild(deleteBtn);
    if (task.completed) {
      card.classList.add("completed");
    }

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", function () {
      toggleTask(task.id);
    });
    actions.appendChild(completeBtn);

    card.appendChild(info);
    card.appendChild(actions);
    taskList.appendChild(card);
  });
}
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}
function toggleTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}
searchInput.addEventListener("input", renderTasks);
renderTasks();
