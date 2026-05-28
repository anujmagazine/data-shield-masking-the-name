# DataShield — Mask Athlete Data Before Using AI

## Setup (10 seconds)

1. Save the `index.html` file in a folder called `datashield`
2. Open Terminal / Command Prompt
3. Navigate to the folder:
   ```
   cd path/to/datashield
   ```
4. Start the server:
   ```
   python3 -m http.server 8000
   ```
5. Open Chrome: **http://localhost:8000**

That's it. DataShield is running locally on your laptop.

## Features

| Feature | Input | Output |
|---------|-------|--------|
| Paste Text | Copy-paste any text | Masked text + TXT + PDF download |
| Scan Image | JPG/PNG of handwritten notes | OCR → masked text + TXT download |
| Upload PDF | Medical PDF, lab report | Extracted text → masked + TXT + PDF download |

## How It Works

1. **Upload** — paste text, scan an image, or upload a PDF
2. **Detect** — DataShield finds person names automatically
3. **Rename** — you choose aliases (Athlete A, Person B, etc.)
4. **Output** — download masked document, paste into any AI tool safely

## Privacy

- 100% local processing — no data leaves your device
- OCR runs in-browser via Tesseract.js
- PDF reading via Mozilla's pdf.js
- No server, no database, no API calls
- Works offline after first load (libraries cache in browser)

## Demo on Phone (same WiFi)

1. Find your laptop's IP: `ifconfig | grep 192` (Mac) or `ipconfig` (Windows)
2. On phone browser: `http://YOUR_IP:8000`

## Deploy to GitHub Pages (free, permanent URL)

1. Create repo on github.com
2. Upload `index.html`
3. Settings → Pages → Branch: main → Save
4. Live at: `https://yourusername.github.io/datashield/`
