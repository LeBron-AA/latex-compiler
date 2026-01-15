type NoteProps = {
    title : string,
    description : string,
    pdfPath : string,
    language : "es" | "en",
    type: string
}

function Note({props} : {props : NoteProps}) {
    return (
        <li
        className={props.type}>
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
    study : string,
    notes : Array<NoteProps>
}

export default function Subject({props}: {props: SubjectProps}) {
    return (
        <section className={props.study}>
            <h2>{props.name}</h2>
            <ul>
                {props.notes.map((noteProps) => {
                    return <Note key={noteProps.pdfPath} props={noteProps}/>
                })}
            </ul>
        </section>
    );
}