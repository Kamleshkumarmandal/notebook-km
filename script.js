window.onload = function () {
    displayNotes();
};

function addNote() {
    let text = document.getElementById("noteInput").value;
    if (text === "") {
        alert("Write something!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    let noteObj = {
        content: text,
        date: new Date().toLocaleString(),
        pinned: false
    };

    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    displayNotes();
}

function displayNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.sort((a, b) => b.pinned - a.pinned);

    notes.forEach((note, index) => {
        let div = document.createElement("div");
        div.className = "note";
        if (note.pinned) div.classList.add("pinned");

        div.innerHTML = `
            <p>${note.content}</p>
            <small>${note.date}</small><br>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
            <button onclick="pinNote(${index})">${note.pinned ? "Unpin" : "Pin"}</button>
        `;

        notesContainer.appendChild(div);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let newText = prompt("Edit your note:", notes[index].content);
    if (newText !== null) {
        notes[index].content = newText;
        notes[index].date = new Date().toLocaleString();
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

function pinNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function searchNotes() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let notes = document.querySelectorAll(".note");

    notes.forEach(note => {
        let text = note.innerText.toLowerCase();
        note.style.display = text.includes(searchValue) ? "block" : "none";
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
