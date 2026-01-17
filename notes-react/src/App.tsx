import './css/layout.css';
import "./css/dark.css";

import { useState } from 'react';

import Subject, { noteTypeDict, studyDict } from "./Subject.tsx";
import type {NoteProps, SubjectProps} from "./Subject.tsx";
import data from "./assets/index.json";
import {SearchFilter, ComboDashboard, type DashboardItem} from "./Filter.tsx";
import { isBlank } from './css/strutils.ts';

type AppDataType = {subjects : SubjectProps[]}

/* Omit accents while filtering subjects, more lenient*/
function normalizeText(text: string) {
  return text
    .normalize("NFD")              // separa letra y tilde
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toLowerCase();
}


export default function App() {
  const noteFilters: Array<DashboardItem<NoteProps>> = [
    {dict : noteTypeDict, property : "type", title:"Tipo"},
    {dict : {en:"English", es:"Español"}, property : "language", title:"Idioma"}
  ];

  const subjectFilters : Array<DashboardItem<SubjectProps>> = [
    {dict : studyDict, property : "study", title: "Estudios"},
    {dict : {"1":"Primero","2":"Segundo","3":"Tercero"}, property: "grade", title : "Curso"},
    {dict : {"1":"Primer","2":"Segundo", "anual" : "Anual"}, property: "semester", title : "Semestre"}    
  ];

  const typedData = data as AppDataType;
  const [subjects, setSubjects] = useState<SubjectProps[]>(typedData.subjects);
  const [noteFilterFunctions, setNoteFilterFunctions] = useState<Array<(note: NoteProps) => boolean>>(Array(noteFilters.length).fill(() => true));
  const [subjectFilterFunctions, setSubjectFilterFunctions] = useState<Array<(subject : SubjectProps) => boolean>>(Array(subjectFilters.length).fill(() => true));


  function handleSearch(e : React.ChangeEvent<HTMLInputElement>) {
    const filterName = e.currentTarget.value;
    if(isBlank(filterName)) {
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
        <div className='filters'>
        <SearchFilter onSearch={handleSearch}/>
        <ComboDashboard<SubjectProps> combos={subjectFilters} title='Filtrar por asignaturas'
          setFilterFuncs={setSubjectFilterFunctions}  filterFuncs={subjectFilterFunctions}/>          
        <ComboDashboard<NoteProps> combos={noteFilters} title="Filtrar por apuntes"
          setFilterFuncs={setNoteFilterFunctions}  filterFuncs={noteFilterFunctions}/>
        </div>
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
