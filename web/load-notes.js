import { Subject } from "./subject.js"
import { Note } from "./notes.js"

class NotesManager {
    #subjects

    constructor() {
        this.#subjects = []
        fetch("web/index.json").then(response => {
            return response.json();
        }).then(data => {
            this.loadNotes(data);
        });

        const searchBar = document.getElementById("search")
        searchBar.addEventListener("input", this.filterSubjects.bind(this))
    }

    loadNotes(data) {
        const main = document.querySelector("main")
        data.subjects.forEach(subjectEntry => {
            const subject = new Subject(subjectEntry.name, subjectEntry.grade, subjectEntry.semester, subjectEntry.study)
            this.#subjects.push(subject)
            subjectEntry.notes.forEach(note => {
                subject.addNote(new Note(note.pdfPath, note.title, note.description, note.language, note.type))
            });
            main.appendChild(subject.getHtmlElement())
        });

    }

    filterSubjects(event) {
        const filter = event.target.value
        const main = document.querySelector("main")
        main.innerHTML = ""
        for (const subject of this.#subjects) {
            if(subject.matches(filter)) {
                main.appendChild(subject.getHtmlElement())
            }
        }
    }
}

new NotesManager()