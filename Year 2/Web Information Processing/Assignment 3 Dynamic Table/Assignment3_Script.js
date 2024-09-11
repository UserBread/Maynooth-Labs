let arrayOfStudents = [
    {
        "studentname" : "Marcel Dunne",
        "studentid" : "507175556",
        "assignment" : [91, 21, 44, 81, 38],
        "average" : "-%"
    },
    {
        "studentname" : "Jannat Burke",
        "studentid" : "208871284",
        "assignment" : [99, 54, 49, 11, 47],
        "average" : "-%"
    },
    {
        "studentname" : "Sophie Robinson",
        "studentid" : "37616818",
        "assignment" : [76, 72, 85, 4, 92],
        "average" : "-%"
    },

    {
        "studentname" : "Logan Kenny",
        "studentid" : "210358360",
        "assignment" : [23, 39, 5, 59, 69],
        "average" : "-%"
    },

    {
        "studentname" : "Milosz Byrne",
        "studentid" : "609363766",
        "assignment" : [61, 9, 51, 6, 68],
        "average" : "-%"
    },

    {
        "studentname" : "Shrek 1",
        "studentid" : "13531515",
        "assignment" : ["-", "-", "-", "-", "-"],
        "average" : "-%"
    },

    {
        "studentname" : "Shrek 2",
        "studentid" : "381798317",
        "assignment" : ["-", "-", "-", "-", "-"],
        "average" : "-%"
    },

    {
        "studentname" : "Shrek 3",
        "studentid" : "338175913",
        "assignment" : ["-", "-", "-", "-", "-"],
        "average" : "-%"
    },

    {
        "studentname" : "Shrek 4",
        "studentid" : "847629762",
        "assignment" : ["-", "-", "-", "-", "-"],
        "average" : "-%"
    },

    {
        "studentname" : "Shrek 5",
        "studentid" : "112824981",
        "assignment" : ["-", "-", "-", "-", "-"],
        "average" : "-%"
    }
]

let rowNum = 0;
let arrayNum = 0;
let columnNum = 7;
let assignmentNum = 5;

const table = document.getElementById("myTable");
addRow.addEventListener('click', (event) => {
    if (rowNum == 10) return null;
    addRowToTable();
    updateCount();
});
removeRow.addEventListener('click', (event) => {
    if (rowNum == 0) return null;
    table.deleteRow(rowNum);
    rowNum--;
    arrayNum--;
    updateCount();
});
function addRowToTable() {
    rowNum++;
    let row = table.insertRow(rowNum);

    let studentname = row.insertCell(0);
    studentname.innerHTML = arrayOfStudents[arrayNum].studentname;
    studentname.style.textAlign = "left";

    let studentid = row.insertCell(1);
    studentid.innerHTML = arrayOfStudents[arrayNum].studentid;
    studentid.style.textAlign = "left";

    for (let i = 0; i < assignmentNum; i++) {
        let assignment = row.insertCell(i+2);
        if (arrayOfStudents[arrayNum].assignment[i] > 0) {
            assignment.innerHTML = arrayOfStudents[arrayNum].assignment[i];
            assignment.classList.add("assignment");
        }
        else {
            assignment.innerHTML = arrayOfStudents[arrayNum].assignment[i];
            assignment.style.backgroundColor = "yellow";
            assignment.classList.add("assignment");
        }
    }

    let average = row.insertCell(7);
    let ave = getAverage();
    if (ave >= 60) {
        average.innerHTML = ave + "%";
        average.style.textAlign = "right";
        average.setAttribute("id", "average");
    }
    else {
        average.innerHTML = ave + "%";
        average.style.backgroundColor = "red";
        average.style.color = "white";
        average.style.border = "1.5px";
        average.style.textAlign = "right";
        average.setAttribute("id", "average");
    }
    arrayNum++;
}
function getAverage() {
    let ave = 0;
    for (let i = 0; i < assignmentNum; i++) {
        ave += arrayOfStudents[arrayNum].assignment[i];
    }
    if (ave > 0) {
        return Math.floor(ave/assignmentNum);
    }
    return "-";
}
function updateCount() {
    let count = 0;
    for (let i = 0; i <rowNum; i++) {

        for (let j = 0; j < assignmentNum; j++) {
            if (arrayOfStudents[i].assignment[j] == "-") {
                count++;
            }
        }
    }
    unsubCount.innerHTML = "Number of Unsubmitted Assignments: " + count;
}
table.addEventListener('click', (event) => {
    if (event.target.classList.contains('assignment')) {
        event.target.contentEditable = true;
        event.target.addEventListener('blur', function() {
            let edited = event.target.textContent;
        });
    }
});
