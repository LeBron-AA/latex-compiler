import sys
import subprocess
from pathlib import Path


def ensure_style():
    style_file = Path("pygments_style.tex")

    if not style_file.exists():
        print("Generando estilos de pygments...")
        with open(style_file, "w", encoding="utf8") as f:
            subprocess.run(
                ["pygmentize", "-S", "vs", "-f", "latex"],
                stdout=f,
                check=True
            )


def generate_tex(input_file):
    input_path = Path(input_file)

    if not input_path.exists():
        print(f"Error: {input_file} no existe")
        return

    ensure_style()

    output_file = input_path.with_suffix(".tex")

    subprocess.run([
        "pygmentize",
        "-l", "c",
        "-f", "latex",
        "-O", "style=vs,linenos=1,verboptions=fontsize=\\footnotesize,obeytabs=true,tabsize=4",
        "-o", str(output_file),
        str(input_path)
    ], check=True)

    print(f"Generado: {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate_tex.py archivo.c")
    else:
        generate_tex(sys.argv[1])