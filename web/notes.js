export class Note {
    static typeMap = {"teoría" : "theory", "ejercicios" : "exercises"}
    #pdfPath
    #title
    #description
    #language
    #listEntry
    #type

    constructor(pdfPath, title, description, language, type) {
        this.#pdfPath = pdfPath
        this.#title = title
        this.#description = description
        this.#language = language
        this.#type = type
    }

    getHtmlElement() {
        if(!this.#listEntry) {
            this.#listEntry = document.createElement("li")
            const link = this.#listEntry.appendChild(document.createElement("a"))
            const typeClass = Note.typeMap[this.#type] 
            if(typeClass) this.#listEntry.classList.add(typeClass)
            
            link.textContent = this.#title
            link.setAttribute("title", this.#description)
            link.setAttribute("href", `${this.#pdfPath}?v=${Date.now()}`)
        }
        return this.#listEntry
    }
}