# DataShield

**Mask athlete names in medical documents before using AI tools. 100% local. No data leaves your device.**

Built by [AI&Beyond](https://aiandbeyond.ai) for the [Olympic Gold Quest (OGQ)](https://www.olympicgoldquest.in/) Para Sports Science and Nutrition teams.

---

## Start Using DataShield

**Open this link on your laptop or phone:**

**https://anujmagazine.github.io/data-shield-masking-the-name/**

That's it. No installation, no login, no setup. Works in Chrome, Safari, Edge, or any browser.

Bookmark the link for quick access. You can also add it to your phone's home screen — open the link in Chrome, tap the three-dot menu, and select "Add to Home screen".

---

## What It Does

Sports science and nutrition teams handle sensitive documents every day — blood reports, diet logs, injury notes, training data. AI tools like ChatGPT and Claude can analyse these brilliantly, but uploading a document with a real athlete name is a privacy risk.

**DataShield removes this barrier.** Replace all names with aliases before the document ever touches an AI tool. Get the insights. Protect the athlete.

---

## How to Use It (4 Steps)

### Step 1 — Upload your document

You have three options:
- **Paste Text** — copy-paste medical notes, nutrition plans, or reports directly
- **Scan Image** — upload a photo of handwritten notes (JPG or PNG)
- **Upload PDF** — upload medical PDFs, blood reports, or lab results

### Step 2 — Review detected names

DataShield automatically finds person names in the document — athletes, doctors, coaches, nutritionists. Review the list:
- Remove any false matches (words incorrectly flagged as names)
- Add any names the tool missed using the text box at the bottom

### Step 3 — Choose aliases

Give each person an alias — for example, "Athlete A", "Doctor B", or anything you prefer. The original name will never appear in the output.

### Step 4 — Get masked output

Your document is ready with all names replaced. You can:
- **Copy to clipboard** — paste directly into ChatGPT, Claude, Gemini, or any AI tool
- **Download as TXT** — plain text file
- **Download as PDF** — formatted PDF with a separate mapping reference page (keep this page private for your records)

---

## Is My Data Safe?

**Yes. 100% safe.**

- Everything runs inside your browser. No data is sent to any server, ever.
- Image scanning (OCR) runs locally using Tesseract.js — your photos never leave your device.
- PDF reading runs locally using Mozilla pdf.js — no cloud processing.
- There are no accounts, no logins, no tracking, and no ads.
- The app works offline after the first load (browser caches the libraries).

**What about the code being on GitHub?** GitHub only hosts the app code (HTML, CSS, JavaScript) — think of it like a vending machine that hands you a sealed notebook. The machine knows what the notebook looks like, but has no idea what you write inside it. Everything you do inside DataShield stays on your device.

---

## Tips for Best Results

- **Use clear, typed documents when possible** — the name detection works best with properly formatted text
- **For handwritten notes**, take a clear, well-lit photo with good contrast
- **Always review Step 2 carefully** — check that all names are caught before proceeding
- **Keep the PDF mapping page private** — if you download the masked PDF, the last page shows which alias maps to which real name. Do not share this page with AI tools.
- **Works on phone too** — the full app works on mobile browsers, handy for quick masking on the go

---

## Use Cases

- **Sports Nutritionists** — mask athlete names in diet logs and supplement trackers before asking AI to analyse nutrition gaps
- **Sports Scientists** — anonymise blood reports and training load data before using AI for pattern detection
- **Physiotherapists** — remove athlete identity from injury notes before getting AI-assisted treatment suggestions
- **Team Doctors** — sanitise medical records before using AI for analysis
- **Coaches** — anonymise performance data before AI tactical analysis

---

## The Idea Behind This

This app was built using [Claude](https://claude.ai) by Anthropic as part of an AI literacy demonstration for enterprise teams. It demonstrates a principle we teach at [AI&Beyond](https://aiandbeyond.ai):

> *AI tools become safe to use once you remove the barrier — and the barrier is almost always about data, not capability.*

DataShield exists because a sports science team wanted to use AI but could not risk athlete privacy. The solution was not to avoid AI. It was to make the data safe first.

---

## About AI&Beyond

[AI&Beyond](https://aiandbeyond.ai) is an enterprise AI literacy and training company delivering customised AI bootcamps across industries. Co-founded by Jaspreet Bindra and Anuj Magazine.

---

## Technical Details

<details>
<summary>Click to expand (for developers)</summary>

### Architecture

DataShield is a single HTML file with zero backend dependencies. Everything runs client-side:

- **OCR Engine:** Tesseract.js v5.1.1 — offline text recognition from images
- **PDF Reader:** Mozilla pdf.js v3.11.174 — client-side PDF text extraction
- **PDF Generator:** jsPDF v2.5.1 — creates downloadable masked PDFs
- **Font:** Plus Jakarta Sans via Google Fonts

### Name Detection Engine

The detection uses a multi-tier strategy:

1. **Labeled names** — names after `Athlete:`, `Coach:`, `Dr.`, `Signed:`, `Reviewed by:`, etc.
2. **Initials-based names** — patterns like P.V. Sindhu, M.C. Mary Kom, K.L. Rahul
3. **Contextual names** — names in action context ("Neeraj reported", "briefed Sandeep")
4. **Indian surname signals** — 120+ known Indian surnames boost detection even for single occurrences
5. **Repeated capitalized pairs** — two-word capitalized phrases appearing 2+ times
6. **ALL-CAPS support** — normalizes uppercase text common in medical PDFs

Every candidate is checked against a 250+ term exclusion list covering lab parameters, anatomy, medical procedures, sports science terms, and document vocabulary.

Masking uses word-bounded, case-insensitive replacement. After full-name replacement, individual name parts (first names, last names) are also masked to catch standalone references like "Neeraj reported pain" when "Neeraj Chopra" was the detected name.

### Running Locally

If you want to run DataShield on your own machine:

```bash
git clone https://github.com/anujmagazine/data-shield-masking-the-name.git
cd data-shield-masking-the-name
python3 -m http.server 8000
# Open http://localhost:8000 in Chrome
```

### File Structure

```
data-shield-masking-the-name/
├── index.html    # Complete application — single file
└── README.md     # This file
```

</details>

---

## License

MIT License — free to use, modify, and distribute.

---

**Made for athlete privacy.**
