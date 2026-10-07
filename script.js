// Student Task Manager - main script

let tasks = [];

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

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

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty">No tasks yet.</p>';
    return;
  }

  tasks.forEach(function (task) {
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
    // COMPLETE BUTTON GOES HERE

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
renderTasks();
