// window.onload = () => {
// 	const formItems = document.querySelector("#addForm");

// 	let items = document.getElementById("items");
// 	let submit = document.getElementById("submit");

// 	let editItem = null;
// 	// call addItem method
// 	formItems.addEventListener("submit", addItem);
// 	items.addEventListener("click", removeItem);     // call removeItem method
// };

// function addItem(e) {
// 	e.preventDefault();

// 	if (submit.value != "Submit") {
// 		console.log("Hello");
// 		// console.log(editItem.target.parentNode.childNodes[0].data);
// 		editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;
// 		// console.log("------------");
// 		// console.log(editItem.target.parentNode.childNodes[0].data);

// 		submit.value = "Submit";
// 		document.getElementById("item").value = "";

// 	}

// 	let newItem = document.getElementById("item").value;
// 	if (newItem.trim() == "" || newItem.trim() == null)
// 		return false;
// 	else
// 		document.getElementById("item").value = "";

// 	let li = document.createElement("li");    // display items in list
// 	console.log(li)
// 	// li.className = "list-group-item";

// 	// let deleteButton = document.createElement("button");  // create a delete button

// 	// deleteButton.className = "btn-danger btn btn-sm float-right delete";

// 	// deleteButton.appendChild(document.createTextNode("Delete"));   // set button name

// 	// let editButton = document.createElement("button");        // create a edit button

// 	// editButton.className = "btn-success btn btn-sm float-right edit";

// 	// editButton.appendChild(document.createTextNode("Edit"));     // set button name

// 	// li.appendChild(document.createTextNode(newItem));    // append to task to list
// 	// li.appendChild(deleteButton);           // append delete button to task
// 	// li.appendChild(editButton);             // append edit button to task

// 	// items.appendChild(li);
// }

// function removeItem(e) {
// 	e.preventDefault();
// 	if (e.target.classList.contains("delete")) {
// 		if (confirm("Are you Sure?")) {
// 			let li = e.target.parentNode;
// 			items.removeChild(li);
// 			alert("List deleted Successfully");
// 		}

// 	}
// 	if (e.target.classList.contains("edit")) {
// 		document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
// 		submit.value = "EDIT";
// 		editItem = e;
// 	}
// }


// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
	const list = document.querySelector("ul");
	const li = document.createElement("li");
	// li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
	//   <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
	//   <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
	  li.innerHTML = `<input type="text" value="${task.task}" onfocus="getCurrentTask(this)" ><button type="submit" onclick="removeTask(this)">Remove</button>
	  <button type="submit" onclick="editTask(this)">Edit</button>`;
	list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
	alert("Please add some task!");
	return false;
  }
  // check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
	alert("Task already exist!");
	return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
//   li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
//   <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
//   <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
li.innerHTML = `<input type="text" value="${task.task}" onfocus="getCurrentTask(this)" ><button type="submit" onclick="removeTask(this)">Remove</button>
<button type="submit" onclick="editTask(this)">Edit</button>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
	if (task.task === event.nextElementSibling.value) {
	  task.completed = !task.completed;
	}
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
	if (task.task === event.parentNode.children[1].value) {
	  // delete task
	  tasks.splice(tasks.indexOf(task), 1);
	}
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
	alert("Task is empty!");
	event.value = currentTask;
	return;
  }
  // task already exist
  tasks.forEach(task => {
	if (task.task === event.value) {
	  alert("Task already exist!");
	  event.value = currentTask;
	  return;
	}
  });
  // update task
  tasks.forEach(task => {
	if (task.task === currentTask) {
	  task.task = event.value;
	}
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

