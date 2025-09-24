#!/usr/bin/env bash

set -e

echo "🔄 Updating package index..."
sudo apt-get update -y

echo "📦 Installing TeX Live (pdflatex) and TikZ..."
sudo apt-get install -y \
  texlive-latex-base \
  texlive-latex-recommended \
  texlive-latex-extra \
  texlive-pictures

echo "✅ Installation complete!"
echo "Checking versions:"

# Verify pdflatex
if command -v pdflatex &> /dev/null; then
    echo "pdflatex version:"
    pdflatex --version | head -n 1
else
    echo "❌ pdflatex not found"
fi