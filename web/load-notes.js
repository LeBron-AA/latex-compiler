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
    }

    loadNotes(data) {
        const main = document.querySelector("main")
        data.subjects.forEach(subjectEntry => {
            const subject = new Subject(subjectEntry.name, subjectEntry.grade, subjectEntry.semester, subjectEntry.study)
            this.#subjects.push(subject)
            subjectEntry.notes.forEach(note => {
                subject.addNote(new Note(note.pdfPath, note.title, note.description, note.language))
            });
            main.appendChild(subject.getHtmlElement())
        });

    }
}

new NotesManager()