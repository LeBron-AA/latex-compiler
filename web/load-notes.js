
function createSubjectSection(subjectName, mainElement) {
    const section = mainElement.appendChild(document.createElement("section"));
    const header = document.createElement("h2");
    header.textContent = subjectName;
    section.appendChild(header);
    return section.appendChild(document.createElement("ul"));
}

function createSectionEntry(sectionList, note) {
    const entry = sectionList.appendChild(document.createElement("li"));
    const reference = entry.appendChild(document.createElement("a"));
    reference.textContent = note.title;
    reference.setAttribute("alt", note.description);
    reference.setAttribute("title", note.description);
    reference.setAttribute("href", note.pdfPath);
}

function processJson(data) {
    //Saves the subjects and their lists
    let subjects = new Map();
    let mainElement = document.querySelector("main");
    data.notes.forEach(note => {
        if(!subjects.has(note.subject)) {
            subjects.set(note.subject, createSubjectSection(note.subject, mainElement))
        }
        createSectionEntry(subjects.get(note.subject), note);
    });
}

fetch("web/index.json").then(response => {
    return response.json();
}).then(data => {
    processJson(data);
});