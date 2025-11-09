@echo off
setlocal EnableDelayedExpansion

:: CONFIG
set "FOLDER=3Carrera\AMat3\Tema2"
set "FILENAME=tema2"
set "COMP_FILE=comp.tex"

:: PROGRAM
copy "%FOLDER%\%FILENAME%.tex" "%cd%\%COMP_FILE%"
cls
:loop
fc /b "%cd%\%FOLDER%\%FILENAME%.tex" "%cd%\%COMP_FILE%" >nul
if errorlevel 1 (
    ::no son iguales
    cls
    copy "%cd%\%FOLDER%\%FILENAME%.tex" "%cd%\%COMP_FILE%"
    call "C:\Program Files\Git\bin\bash.exe" -c "cd %cd:\=/%; ls;./laton -d https://latexonline.cc ./%FOLDER:\=/%/%FILENAME%.tex"
    copy "%cd%\%FILENAME%.pdf" "%cd%\%FOLDER%\%FILENAME%.pdf"
    echo Compilado
) else (
    timeout /t 5 > nul
)
goto :loop