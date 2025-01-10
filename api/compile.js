const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Handle file upload
    const file = req.body; // This should be the uploaded LaTeX file

    // Save the LaTeX file to the server
    const filePath = path.join('/tmp', 'document.tex');
    fs.writeFileSync(filePath, file);

    // Compile the LaTeX file using pdflatex
    exec(`pdflatex ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: stderr });
      }
      // Send the compiled PDF back
      const pdfPath = filePath.replace('.tex', '.pdf');
      const pdfBuffer = fs.readFileSync(pdfPath);

      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
