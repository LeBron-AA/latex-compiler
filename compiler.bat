@echo off
copy "D:\UNIOVI\latex-compiler\3Carrera\AMat3\apuntes.tex" "%cd%\comp.tex"
cls
:loop
fc /b "D:\UNIOVI\latex-compiler\3Carrera\AMat3\apuntes.tex" "%cd%\comp.tex" >nul
if errorlevel 1 (
    ::no son iguales
    cls
    copy "D:\UNIOVI\latex-compiler\3Carrera\AMat3\apuntes.tex" "%cd%\comp.tex"
    call "C:\Program Files\Git\bin\bash.exe" -c "cd D:/UNIOVI/latex-compiler; ls;./laton -d https://latexonline.cc ./3Carrera/AMat3/apuntes.tex"
    copy "%cd%\apuntes.pdf" "D:\UNIOVI\latex-compiler\3Carrera\AMat3\apuntes.pdf"
    echo Compilado
) else (
    timeout /t 5 > nul
)

goto :loop