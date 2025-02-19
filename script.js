document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    setupPagination();
});

let notesPerPage = 5;
let currentPage = 1;

function saveNote() {
    let category = document.getElementById("category").value;
    let title = document.getElementById("title").value;
    let noteText = document.getElementById("noteInput").value;
    
    if (title.trim() === "" || noteText.trim() === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ category, title, noteText });
    localStorage.setItem("notes", JSON.stringify(notes));
    
    document.getElementById("title").value = "";
    document.getElementById("noteInput").value = "";
    
    loadNotes();
    setupPagination();
}

function loadNotes() {
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    let start = (currentPage - 1) * notesPerPage;
    let end = start + notesPerPage;
    let paginatedNotes = notes.slice(start, end);
    
    paginatedNotes.forEach((note, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${note.category}</td>
            <td>${note.title}</td>
            <td>${note.noteText}</td>
            <td class="actions">
                <button onclick="editNote(${start + index})"><i class="bi bi-pencil-square"></i></button>
                <button onclick="deleteNote(${start + index})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        notesList.appendChild(row);
    });

    setupPagination();
}

document.getElementById("prevPage").addEventListener("click", () => { currentPage--; loadNotes(); });
document.getElementById("nextPage").addEventListener("click", () => { currentPage++; loadNotes(); });
