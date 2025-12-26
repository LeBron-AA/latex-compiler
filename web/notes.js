export class Note {
    #pdfPath
    #title
    #description
    #language
    #listEntry

    constructor(pdfPath, title, description, language) {
        this.#pdfPath = pdfPath
        this.#title = title
        this.#description = description
        this.#language = language
    }

    getHtmlElement() {
        if(!this.#listEntry) {
            this.#listEntry = document.createElement("li")
            const link = this.#listEntry.appendChild(document.createElement("a"))
            link.textContent = this.#title
            link.setAttribute("title", this.#description)
            link.setAttribute("href", this.#pdfPath)
        }
        return this.#listEntry
    }
}