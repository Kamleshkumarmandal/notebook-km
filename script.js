// Load saved notes when page opens
window.onload = function() {
    displayNotes();
};

function addNote() {
    let noteText = document.getElementById("noteInput").value;

    if (noteText === "") {
        alert("Please write something!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    displayNotes();
}

function displayNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(function(note, index) {
        let div = document.createElement("div");
        div.className = "note";
        div.innerHTML = note + 
            `<br><button onclick="deleteNote(${index})">Delete</button>`;
        notesContainer.appendChild(div);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
