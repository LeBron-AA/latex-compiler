import './App.css';
import Subject from "./Subject.tsx";
import type {SubjectProps} from "./Subject.tsx";
import data from "./index.json";

type AppDataType = {subjects : SubjectProps[]}

export default function App() {
  const typedData = data as AppDataType;
  return (
    <main>
    {typedData.subjects.map((subject) => <Subject key={subject.name} props={subject}/>)}
    </main>
  )
}
