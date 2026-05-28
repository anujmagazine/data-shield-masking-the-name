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

**Already know the names?** Type them in the "Known Names" field (comma-separated) — these will always be detected, even if the auto-scan misses them.

### Step 2 — Review detected names

DataShield automatically finds person names in the document — athletes, doctors, coaches, nutritionists. Review the list:
- Remove any false matches (words incorrectly flagged as names)
- Add any names the tool missed using the text box at the bottom
- For scanned images, you'll see a tip reminding you to double-check — OCR may not catch every name

### Step 3 — Choose aliases

Give each person an alias — for example, "Person 1", "Athlete 2", or anything you prefer. The original name will never appear in the output.

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
- The app works offline after the first load (a service worker caches all libraries).

**Want proof?** Load the app, then turn off your WiFi or switch to airplane mode. Paste a document, detect names, mask them, and download. Everything still works. If data were going anywhere, it would break.

**What about the code being on GitHub?** GitHub only hosts the app code (HTML, CSS, JavaScript) — think of it like a vending machine that hands you a sealed notebook. The machine knows what the notebook looks like, but has no idea what you write inside it. Everything you do inside DataShield stays on your device.

---

## Tips for Best Results

- **Always review Step 2 carefully** — check that all names are caught before proceeding. This is the most important step.
- **Use the Known Names field** — if you already know which names are in the document, type them in Step 1. They will always be detected.
- **Use clear, typed documents when possible** — the name detection works best with properly formatted text.
- **For handwritten notes**, take a clear, well-lit photo with good contrast. The app will tell you if the scan quality is poor.
- **Keep the PDF mapping page private** — if you download the masked PDF, the last page shows which alias maps to which real name. Do not share this page with AI tools.
- **Works on phone too** — the full app works on mobile browsers, handy for quick masking on the go.

---

## Use Cases

- **Sports Nutritionists** — mask athlete names in diet logs and supplement trackers before asking AI to analyse nutrition gaps
- **Sports Scientists** — anonymise blood reports and training load data before using AI for pattern detection
- **Physiotherapists** — remove athlete identity from injury notes before getting AI-assisted treatment suggestions
- **Team Doctors** — sanitise medical records before using AI for analysis
- **Coaches** — anonymise performance data before AI tactical analysis
- **Strategy Team** — mask identities in performance reviews and selection notes before AI-assisted analysis

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
- **Offline Support:** Service Worker with cache-first strategy — precaches all CDN assets
- **Font:** Plus Jakarta Sans via Google Fonts

### Name Detection Engine (v3)

The detection uses an 8-tier strategy, tested against all 143 OGQ para athlete names with 100% masking coverage and zero leaks:

1. **Labeled names** — names after `Athlete:`, `Coach:`, `Dr.`, `Signed by:`, `Reviewed by:`, etc. Only consecutive valid words are joined (prevents false merges like "Coach: Subhash reviewed Avani" becoming one name)
2. **Initials with dots** — patterns like P.V. Sindhu, M.C. Mary Kom, K.L. Rahul
3. **Short uppercase prefixes** — South Indian style names without dots (DS Vishnu, MS Sharath)
4. **Contextual names** — names near action verbs ("Neeraj reported", "with Sandeep", "Simran's knee")
5. **Repeated capitalized pairs** — two-word capitalised phrases appearing 2+ times
6. **Indian surname signal** — capitalised pair with a known Indian surname, even once (230+ surnames)
7. **Numbered/lettered list items** — "1. Aarav Singh", "B Naresh"
8. **Known Indian first names** — 400+ Indian first names detected anywhere in text as single words

Additional safeguards:
- **ALL-CAPS normalisation** — handles uppercase text common in medical PDFs
- **350+ term exclusion list** — blocks lab parameters, anatomy terms, medical procedures, sports terminology, professional titles, and common English words
- **Medical suffix filter** — rejects words ending in -tion, -ology, -itis, -emia, -plasty, etc.
- **Acronym filter** — short ALL-CAPS words (SAI, BMI, RFD) rejected unless they match a known name
- **False merge prevention** — labeled patterns only join consecutive valid name words, preventing non-adjacent names from being merged across verbs or other text

### Masking Pipeline

Two-phase word-bounded, case-insensitive replacement:

1. **Phase 1:** Full names replaced longest-first (prevents partial matches)
2. **Phase 2:** Individual name parts (first names, last names) replaced to catch standalone references. Ambiguous parts (shared across multiple people) are still masked for privacy — leaking is worse than a wrong alias.

### Testing

The test suite (`test_final.js`) covers:
- **143-name coverage test** — every OGQ para athlete name is embedded in a realistic document snippet, masked, and verified for zero leaks
- **False merge tests** — ensures names near each other in sentences (e.g. "Coach: Subhash reviewed Avani") are not incorrectly merged
- **Smoke tests** — no false positives on acronyms (SAI, BMI), professional titles (Nutritionist), medical terms (Hemoglobin, Ferritin, Cortisol), and empty text

Run tests:
```bash
node test_final.js
```

### Bugs Fixed (v3)

- Names merging across newlines in multi-line documents
- 17 athlete names missed due to incomplete first name and surname dictionaries
- Shared name parts (e.g. "Patel" appearing in two athletes) leaking in Phase 2
- "SAI" false positive (Sports Authority of India vs. the name Sai)
- Professional titles (Nutritionist, Physiotherapist, etc.) detected as names
- Alias labels overflowing after 26+ names (now uses numeric "Person 1", "Person 2", etc.)
- Single known names missed in context patterns
- PDF mapping page overflow for 30+ names (now auto-paginates)
- Step 2 name highlighting breaking on HTML-encoded characters
- False merge of non-adjacent names in labeled patterns ("Subhash Avani" from "Coach: Subhash reviewed Avani")

### Running Locally

```bash
git clone https://github.com/anujmagazine/data-shield-masking-the-name.git
cd data-shield-masking-the-name
python3 -m http.server 8000
# Open http://localhost:8000 in Chrome
```

### File Structure

```
data-shield-masking-the-name/
├── index.html      # Complete application — single file
├── sw.js           # Service worker for offline caching
├── test_final.js   # Automated test suite (143 names + false merge + smoke tests)
└── README.md       # This file
```

</details>

---

## License

MIT License — free to use, modify, and distribute.

---

**Made for athlete privacy.**
