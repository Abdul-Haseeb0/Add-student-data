var userData = [];

function clearLocalStorage() {
    localStorage.removeItem('userData');
    userData = [];
    var table = document.getElementById("dataTable");
    table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Country</th><th>Age</th><th>Edit</th><th>Delete</th></tr>";
}

window.onload = function() {
    if(localStorage.getItem('userData')) {
        userData = JSON.parse(localStorage.getItem('userData'));
        userData.forEach(function(user) {
            addRow(user);
        });
    }
}

function printValues() {
    var input1Value = document.getElementById("input1").value;
    var input2Value = document.getElementById("input2").value;
    var input4Value = document.getElementById("input4").value;
    var input3Value = document.getElementById("input3").value;
    
    console.log("Input 1:", input1Value);
    console.log("Input 2:", input2Value);
    console.log("Input 4:", input4Value);
    console.log("Input 3:", input3Value);

    var user = {
        name: input1Value,
        email: input2Value,
        country: input4Value,
        age: input3Value
    };

    userData.push(user);
    localStorage.setItem('userData', JSON.stringify(userData));
    addRow(user);
}

function addRow(user) {
    var table = document.getElementById("dataTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = user.name;
    cell2.innerHTML = user.email;
    cell3.innerHTML = user.country;
    cell4.innerHTML = user.age;

    cell1.classList.add("cell");
    cell2.classList.add("cell");
    cell3.classList.add("cell");
    cell4.classList.add("cell");

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function() {
        userData.splice(userData.indexOf(user), 1);
        localStorage.setItem('userData', JSON.stringify(userData));
        table.deleteRow(row.rowIndex);
    };
    cell6.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-button");
    editButton.onclick = function() {
        editRow(row, user);
    };
    cell5.appendChild(editButton);
}

function editRow(row, user) {
    var cells = row.cells;
    for (var i = 0; i < cells.length - 2; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("edit-inp");
        input.value = cells[i].innerHTML;
        cells[i].innerHTML = "";
        cells[i].appendChild(input);
    }
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.classList.add("save-button");
    saveButton.onclick = function() {
        saveRow(row, user);
    };
    cells[cells.length - 2].innerHTML = "";
    cells[cells.length - 2].appendChild(saveButton);
}

function saveRow(row, user) {
    var cells = row.cells;
    for (var i = 0; i < cells.length - 2; i++) {
        var input = cells[i].querySelector("input");
        cells[i].innerHTML = input.value;
        user[Object.keys(user)[i]] = input.value;
    }
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-button");
    editButton.onclick = function() {
        editRow(row, user);
    };
    cells[cells.length - 2].innerHTML = "";
    cells[cells.length - 2].appendChild(editButton);

    localStorage.setItem('userData', JSON.stringify(userData));
}
