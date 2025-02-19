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

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    
    loadNotes();
    setupPagination();
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    document.getElementById("category").value = notes[index].category;
    document.getElementById("title").value = notes[index].title;
    document.getElementById("noteInput").value = notes[index].noteText;
    
    deleteNote(index);
}

function searchNotes() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll(".note-table tbody tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "table-row" : "none";
    });
}

function setupPagination() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let totalPages = Math.ceil(notes.length / notesPerPage);
    
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => { currentPage--; loadNotes(); });
document.getElementById("nextPage").addEventListener("click", () => { currentPage++; loadNotes(); });
