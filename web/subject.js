export class Subject {
    static #studyMap = {"Matemáticas" : "math", "Informática" : "software"}
    #name
    #grade
    #semester
    #study
    #notes
    #section
    #htmlList

    constructor(name, grade, semester, study) {
        this.#name = name
        this.#grade = grade
        this.#semester = semester
        this.#study = study
        this.#notes = []
        this.#createHtmlElement()
    }

    #isBlank(str) {
        return !str || str.trim().length === 0;
    }

    matches(nameStr) {
        if(this.#isBlank(nameStr))  return true
        return this.#name.matches(nameStr)
    }

    addNote(note) {
        this.#notes.push(note)
        this.#htmlList.appendChild(note.getHtmlElement())
    }

    #createHtmlElement() {
        this.#section = document.createElement("section")
        const header = this.#section.appendChild(document.createElement("h2"))
        this.#htmlList = this.#section.appendChild(document.createElement("ul"))
        
        header.textContent = this.#name
        const studyClass = Subject.#studyMap[this.#study]
        if (studyClass) {
            this.#section.classList.add(studyClass)
        }
    }

    getHtmlElement() {
        return this.#section
    }
}