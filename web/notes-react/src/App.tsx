import './css/style.css';
import './css/layout.css';

import { useState } from 'react';

import Subject, { noteTypeDict, studyDict } from "./Subject.tsx";
import type {NoteProps, SubjectProps} from "./Subject.tsx";
import data from "./index.json";
import {SearchFilter, ComboFilter} from "./Filter.tsx";

type AppDataType = {subjects : SubjectProps[]}

/* Omit accents while filtering subjects, more lenient*/
function normalizeText(text: string) {
  return text
    .normalize("NFD")              // separa letra y tilde
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toLowerCase();
}

type NoteFilters = {
  dict : Record<string, string>,
  property : keyof NoteProps,
  title : string
}

type SubjectFilters = {
  dict : Record<string, string>,
  property : keyof SubjectProps,
  title : string
}

export default function App() {
  const noteFilters: Array<NoteFilters> = [
    {dict : noteTypeDict, property : "type", title:"Tipo"},
    {dict : {en:"English", es:"Español"}, property : "language", title:"Idioma"}
  ];

  const subjectFilters : Array<SubjectFilters> = [
    {dict : studyDict, property : "study", title: "Estudios"}
  ];

  const typedData = data as AppDataType;
  const [subjects, setSubjects] = useState<SubjectProps[]>(typedData.subjects);
  const [noteFilterFunctions, setNoteFilterFunctions] = useState<Array<(note: NoteProps) => boolean>>(Array(noteFilters.length).fill(() => true));
  const [subjectFilterFunctions, setSubjectFilterFunctions] = useState<Array<(subject : SubjectProps) => boolean>>(Array(subjectFilters.length).fill(() => true));
  

  function handleSearch(e : React.ChangeEvent<HTMLInputElement>) {
    const filterName = e.currentTarget.value;
    if(!filterName || filterName.trim().length === 0) {
      setSubjects(typedData.subjects);
    } else {
      setSubjects(typedData.subjects.filter((subject) => {
        return normalizeText(subject.name.toLowerCase()).includes(normalizeText(filterName.toLowerCase()));
      }));
    }      
  }

  return (
    <>
    <header>
        <h1>Apuntes de UNIOVI</h1>
        <details>
        <summary>Filtros</summary>
        <SearchFilter onSearch={handleSearch}/>
        <section className='dashboard'>
            {subjectFilters.map((filter, index) => {
              return (
              <div className='vert'>
              <label>{filter.title + ":"}</label>
              <ComboFilter<SubjectProps> key={`comboFilterSubject-${index}`}
              dict={filter.dict} property={filter.property}
              changeFilter={(func) => {
                const nextFilterFuncs = subjectFilterFunctions.slice();
                nextFilterFuncs[index] = func;
                console.log(func);
                setSubjectFilterFunctions(nextFilterFuncs);
              }}/>
              </div>);
            })}

            {noteFilters.map((filter, index) => {
              return (
              <div className='vert'>
              <label>{filter.title + ":"}</label>
              <ComboFilter<NoteProps> key={`comboFilterNotes-${index}`}
              dict={filter.dict} property={filter.property}
              changeFilter={(func) => {
                const nextFilterFuncs = noteFilterFunctions.slice();
                nextFilterFuncs[index] = func;
                console.log(func);
                setNoteFilterFunctions(nextFilterFuncs);
              }}/>
              </div>);
            })}
        </section>
        </details>
    </header>    
    <main>
    {subjects.filter((s) => subjectFilterFunctions.every(fn => fn(s))).map((subject) => 
      <Subject key={subject.name} props={subject}
      notesFilter={(note) => noteFilterFunctions.every(fn => fn(note))}/>)}
    </main>
    </>
  )
}
