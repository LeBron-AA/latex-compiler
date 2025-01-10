const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (!req.body || !req.body.latex) {
    return res.status(400).json({ error: 'No LaTeX source code provided' });
  }

  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const latexFilePath = path.join(tempDir, 'document.tex');
  fs.writeFileSync(latexFilePath, req.body.latex);

  exec(`pdflatex -output-directory=${tempDir} ${latexFilePath}`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }

    const pdfPath = path.join(tempDir, 'document.pdf');
    const pdf = fs.readFileSync(pdfPath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  });
};
