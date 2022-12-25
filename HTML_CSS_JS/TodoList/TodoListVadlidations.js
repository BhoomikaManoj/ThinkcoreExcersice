window.onload = () => {
	const formItems = document.querySelector("#addForm");

	let items = document.getElementById("items");
	let submit = document.getElementById("submit");

	let editItem = null;
    // call addItem method
    formItems.addEventListener("submit", addItem);
	items.addEventListener("click", removeItem);     // call removeItem method
};

function addItem(e) {
	e.preventDefault(); 

	if (submit.value != "Submit") {
		console.log("Hello");
        // console.log(editItem.target.parentNode.childNodes[0].data);
		editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;
        // console.log("------------");
        // console.log(editItem.target.parentNode.childNodes[0].data);

		submit.value = "Submit";
		document.getElementById("item").value = "";

	}

	let newItem = document.getElementById("item").value;
	if (newItem.trim() == "" || newItem.trim() == null)
		return false;
	else
		document.getElementById("item").value = "";

	let li = document.createElement("li");    // display items in list
	li.className = "list-group-item";

	let deleteButton = document.createElement("button");  // create a delete button

	deleteButton.className = "btn-danger btn btn-sm float-right delete"; 

	deleteButton.appendChild(document.createTextNode("Delete"));   // set button name

	let editButton = document.createElement("button");        // create a edit button

	editButton.className = "btn-success btn btn-sm float-right edit"; 

	editButton.appendChild(document.createTextNode("Edit"));     // set button name

	li.appendChild(document.createTextNode(newItem));    // append to task to list
	li.appendChild(deleteButton);           // append delete button to task
	li.appendChild(editButton);             // append edit button to task

	items.appendChild(li);                 
}

function removeItem(e) {
	e.preventDefault();
	if (e.target.classList.contains("delete")) {
		if (confirm("Are you Sure?")) {
			let li = e.target.parentNode;
			items.removeChild(li);
            alert("List deleted Successfully");
		}
        
	}
	if (e.target.classList.contains("edit")) {
		document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
		submit.value = "EDIT";
		editItem = e;
	}
}

