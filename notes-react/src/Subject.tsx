export type NoteProps = {
    title : string,
    description : string,
    pdfPath : string,
    language : "es" | "en",
    type: "theory" | "exercises",
}

export const noteTypeDict = {
    "theory" : "Teoría",
    "exercises" : "Ejercicios"
}

function Note({props} : {props : NoteProps}) {
    return (
        <li
        className={noteTypeDict[props.type] ? props.type : "other"}>
            <a
            href={`${props.pdfPath}?v=${Date.now()}`}
            title={props.description}
            lang={props.language}>
                {props.title}
            </a>
        </li>
    );
}

export type SubjectProps = {
    name : string,
    grade : 1 | 2 | 3 | 4 | 5 | 6 | "other",
    semester : 1 | 2 | "anual",
    study : "math" | "software",
    notes : Array<NoteProps>
}

export const studyDict = {
    "math" : "Matemáticas",
    "software" : "Informática"
}

export default function Subject({props, notesFilter}: {props: SubjectProps, notesFilter : (n : NoteProps) => boolean}) {
    const filteredNotes = props.notes.filter(notesFilter);
    return ( filteredNotes.length === 0 ? null :
        <section className={studyDict[props.study] ? props.study : "other"}>
            <h2>{props.name}</h2>
            <ul>
                {filteredNotes.map((noteProps) => {
                    return <Note key={noteProps.pdfPath} props={noteProps}/>
                })}
            </ul>
        </section>
    );
}