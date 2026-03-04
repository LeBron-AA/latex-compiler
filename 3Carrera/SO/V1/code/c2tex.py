import sys
import subprocess
import re
from pathlib import Path

def generate_clean_tex(input_file):
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"Error: el archivo {input_file} no existe.")
        return

    output_file = input_path.with_suffix(".tex")

    # 1️⃣ Ejecutar pygments para generar el archivo .tex
    cmd = [
        sys.executable, "-m", "pygments",
        "-f", "latex",
        "-O", "style=vs,linenos=1,full",
        "-o", str(output_file),
        str(input_path)
    ]
    print("Ejecutando:", " ".join(cmd))
    subprocess.run(cmd, check=True)

    # 2️⃣ Limpiar el archivo: quitar \documentclass, \usepackage, \begin{document}, \end{document}
    cleaned_lines = []
    pattern_skip = re.compile(r"^(\\documentclass|\\usepackage|\\begin\{document\}|\\end\{document\})")
    
    with open(output_file, "r", encoding="utf-8") as f:
        for line in f:
            if not pattern_skip.match(line.strip()):
                cleaned_lines.append(line)

    # 3️⃣ Sobrescribir el archivo .tex con la versión limpia
    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(cleaned_lines)

    print(f"Archivo limpio generado: {output_file}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate_tex.py archivo.c")
    else:
        generate_clean_tex(sys.argv[1])