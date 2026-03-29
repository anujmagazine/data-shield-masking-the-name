# 🛡 DataShield

**Mask athlete names in medical documents before using AI tools. 100% local. No data leaves your device.**

DataShield is a privacy-first Progressive Web App built for sports nutrition teams, para sports science units, and anyone handling sensitive athlete medical data. It lets you replace real names with aliases before pasting documents into ChatGPT, Claude, Gemini, or any other AI tool — so you get AI-powered insights without exposing athlete identity.

Built by [AI&Beyond](https://aiandbeyond.ai) for the [Olympic Gold Quest (OGQ)](https://www.olympicgoldquest.in/) Para Sports Science and Nutrition teams.

---

## The Problem

Sports science and nutrition teams generate sensitive documents daily — blood reports, diet logs, injury notes, training load data. AI tools like ChatGPT and Claude can analyse these brilliantly, but teams can't use them because:

- Athlete medical data is confidential
- NADA/WADA compliance requires strict data handling
- Uploading a document with "Neeraj Chopra" or "Sumit Antil" to any cloud AI tool is a privacy violation

**DataShield removes this barrier.** Replace names before the document ever touches an AI tool. Get the insights. Protect the athlete.

---

## How It Works
```
Upload Document → Detect Names → Assign Aliases → Get Masked Output
```

### Step 1: Upload
Paste text, upload a photo of handwritten notes, or upload a medical PDF.

### Step 2: Detect
DataShield automatically finds person names in the document. You can remove false matches or add missed names manually.

### Step 3: Rename
Assign aliases — "Athlete A", "Person B", or whatever you choose. The original name will never appear in the output.

### Step 4: Output
Download the masked document as TXT or PDF. Or copy the text directly and paste it into any AI tool. The PDF includes a separate mapping reference page (keep this page private).

---

## Features

| Feature | How It Works |
|---------|-------------|
| **Paste Text** | Copy-paste any medical notes, nutrition plans, or reports |
| **Scan Image** | Upload a JPG/PNG of handwritten notes → OCR extracts text automatically |
| **Upload PDF** | Upload medical PDFs, blood reports, lab results → text extracted automatically |
| **Smart Name Detection** | Finds names after labels (Athlete:, Dr., Coach:), in context ("briefed Sandeep"), and repeated capitalized pairs — while rejecting 200+ medical/sports terms |
| **Copy to Clipboard** | One click → paste directly into ChatGPT, Claude, Gemini |
| **Download TXT** | Plain text file with all names replaced |
| **Download PDF** | Formatted PDF with masked content + separate mapping reference page |

---

## Privacy & Security

- **100% local processing** — no server, no database, no API calls
- **OCR runs in-browser** via [Tesseract.js](https://tesseract.projectnaptha.com/) — your images never leave the device
- **PDF reading** via [Mozilla pdf.js](https://mozilla.github.io/pdf.js/) — no cloud processing
- **No accounts, no logins, no tracking, no ads**
- **Works offline** after first load (libraries cache in browser)
- **Open source** — inspect every line of code

---

## Quick Start (Run Locally)

### Prerequisites
- Any modern browser (Chrome recommended)
- Python 3.x (pre-installed on Mac, [download for Windows](https://www.python.org/downloads/))

### Setup (10 seconds)
```bash
# 1. Clone this repository
git clone https://github.com/YOUR_USERNAME/datashield.git

# 2. Navigate to the folder
cd datashield

# 3. Start local server
python3 -m http.server 8000

# 4. Open Chrome
# Go to http://localhost:8000
```

That's it. DataShield is running on your machine.

### Alternative: No Git Required

1. Click the green **Code** button above → **Download ZIP**
2. Unzip the folder
3. Open Terminal / Command Prompt
4. `cd` into the unzipped folder
5. Run `python3 -m http.server 8000`
6. Open `http://localhost:8000` in Chrome

---

## Show on Your Phone (Same WiFi)

1. Make sure your phone and laptop are on the same WiFi network
2. Find your laptop's IP address:
   - **Mac:** `ifconfig | grep 192`
   - **Windows:** `ipconfig`
3. On your phone's browser, go to: `http://YOUR_LAPTOP_IP:8000`
4. Example: `http://192.168.1.42:8000`

The full app runs on your phone, served from your laptop. Still 100% local.

---

## Deploy to GitHub Pages (Free, Permanent URL)

If you want a shareable link that anyone can access:

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Branch**, select `main` → click **Save**
4. Wait ~60 seconds
5. Your app is live at: `https://YOUR_USERNAME.github.io/datashield/`

**Important:** Even on GitHub Pages, all processing happens in the visitor's browser. GitHub only hosts the code — no athlete data ever reaches GitHub's servers.

---

## What About the Code Being Public on GitHub?

GitHub hosts the **app's code** — the HTML, CSS, and JavaScript. Think of it like a vending machine that hands you a sealed notebook. The vending machine knows what the notebook looks like, but it has no idea what you write inside it.

Everything the user does — the PDFs they upload, the names they type, the aliases they choose, the masked output — is processed by JavaScript running inside their browser. No server receives it. No data is logged. No API is called.

If you prefer the code to be private, GitHub Pages works with private repositories on the free plan.

---

## Technical Details

### Architecture
DataShield is a single HTML file with zero backend dependencies. Everything runs client-side:

- **OCR Engine:** [Tesseract.js v5.1.1](https://github.com/naptha/tesseract.js) — offline text recognition from images
- **PDF Reader:** [Mozilla pdf.js v3.11.174](https://github.com/nicolo-ribaudo/pdfjs-dist) — client-side PDF text extraction
- **PDF Generator:** [jsPDF v2.5.1](https://github.com/parallax/jsPDF) — creates downloadable masked PDFs
- **Styling:** Custom CSS with [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) typography

### Name Detection Engine
The name detection uses a three-tier strategy:

1. **Labeled names (highest confidence):** Finds names after explicit labels like `Athlete:`, `Coach:`, `Dr.`, `Signed:`
2. **Contextual names (medium confidence):** Detects names in action context like "Neeraj reported" or "briefed Sandeep"
3. **Repeated capitalized pairs (lower confidence):** Two-word capitalized phrases appearing 2+ times in the document

Every candidate is checked against a 200+ term exclusion set covering lab parameters (Haemoglobin, Platelet Count), anatomy (Right Knee, Posterior Deltoid), medical procedures (Therapeutic Use Exemption), sports terms (Para Athletics, Training Load), and document vocabulary (Action Items, Follow Up).

### File Structure
```
datashield/
├── index.html    # Complete application (single file)
└── README.md     # This file
```

---

## Use Cases

- **Sports Nutritionists:** Mask athlete names in diet logs, meal plans, and supplement trackers before asking AI to analyse nutrition gaps
- **Sports Scientists:** Anonymise blood reports, training load data, and recovery monitoring before using AI for pattern detection
- **Physiotherapists:** Remove athlete identities from injury notes and rehab protocols before getting AI-assisted treatment suggestions
- **Team Doctors:** Sanitise medical records before using AI for differential diagnosis support
- **Coaches:** Anonymise performance data before using AI for tactical analysis
- **Any organisation handling confidential data:** HR records, legal documents, financial reports

---

## Roadmap

- [ ] Automatic OCR for scanned PDFs (image-based PDFs)
- [ ] Batch processing — mask multiple documents at once
- [ ] Custom exclusion lists for domain-specific vocabulary
- [ ] Service Worker for full offline PWA support
- [ ] Installable app icon (manifest.json)
- [ ] Hindi/regional language OCR support

---

## Built With

This app was built using [Claude](https://claude.ai) by Anthropic as part of an AI literacy demonstration for enterprise teams. It demonstrates a core principle we teach at [AI&Beyond](https://aiandbeyond.ai):

> **AI tools become safe to use once you remove the barrier — and the barrier is almost always about data, not capability.**

DataShield exists because a sports science team wanted to use AI but couldn't risk athlete privacy. The solution wasn't to avoid AI — it was to make the data safe first.

---

## About AI&Beyond

[AI&Beyond](https://aiandbeyond.ai) is an enterprise AI literacy and training company that delivers customized AI bootcamps to organisations across industries. We help teams move from "AI is interesting" to "AI is how we work" — safely, practically, and measurably.

---

## License

MIT License — free to use, modify, and distribute.

---

## Contributing

Found a bug? Have a feature idea? Open an issue or submit a PR. Contributions welcome.

---

**Made with 🛡 for athlete privacy.**
