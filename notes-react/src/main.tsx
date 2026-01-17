import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

console.log(navigator);
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(isDark ? 'Modo oscuro' : 'Modo claro');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
