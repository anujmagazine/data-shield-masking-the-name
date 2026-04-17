# 🛡 DataShield

**Mask athlete names in medical documents before using AI tools. 100% local. No data leaves your device.**

DataShield is a privacy-first web app built for sports nutrition teams, para sports science units, and anyone handling sensitive athlete medical data. It lets you replace real names with aliases before pasting documents into ChatGPT, Claude, Gemini, or any other AI tool — so you get AI-powered insights without exposing athlete identity.

Built by [AI&Beyond](https://aiandbeyond.ai) for the [Olympic Gold Quest (OGQ)](https://www.olympicgoldquest.in/) Para Sports Science and Nutrition teams.

---

## The Problem

Sports science and nutrition teams generate sensitive documents daily — blood reports, diet logs, injury notes, training load data. AI tools can analyse these brilliantly, but teams hesitate because:

- Athlete medical data is confidential
- NADA/WADA compliance requires strict data handling
- Uploading a document with a real athlete name to any cloud AI tool is a privacy violation

**DataShield removes this barrier.** Replace names before the document ever touches an AI tool. Get the insights. Protect the athlete.

---

## How It Works

```
Upload Document → Detect Names → Assign Aliases → Download Masked Output
```

1. **Upload** — paste text, upload a photo of handwritten notes, or upload a medical PDF
2. **Detect** — DataShield automatically finds person names. Remove false matches or add missed names manually
3. **Rename** — assign aliases (Athlete A, Person B, or anything you choose)
4. **Output** — copy the masked text or download as TXT or PDF. Safe to paste into any AI tool

---

## Features

| Feature | Details |
|---------|---------|
| **Paste Text** | Copy-paste any medical notes, nutrition plans, or reports |
| **Scan Image** | Upload JPG/PNG of handwritten notes → OCR extracts text automatically |
| **Upload PDF** | Upload medical PDFs, blood reports, lab results → text extracted automatically |
| **Smart Name Detection** | Finds names after labels (Athlete:, Dr., Coach:) and rejects 200+ medical/sports terms |
| **Copy to Clipboard** | One click → paste directly into ChatGPT, Claude, Gemini |
| **Download TXT** | Plain text file with all names replaced |
| **Download PDF** | Formatted PDF with masked content + separate mapping reference page |

---

## Privacy & Security

- **100% local processing** — no server, no database, no API calls
- **OCR runs in-browser** via Tesseract.js — your images never leave the device
- **PDF reading** via Mozilla pdf.js — no cloud processing
- **No accounts, no logins, no tracking, no ads**
- **Works offline** after first load (libraries cache in browser)
- **Open source** — inspect every line of code

---

## Running DataShield Locally

DataShield is a single HTML file. To use all features including image OCR, you need to serve it via a local web server. Follow the steps below for your operating system.

---

### Step 1 — Get the Files

**Option A: Download ZIP (recommended, no Git needed)**

1. Click the green **Code** button at the top of this page
2. Click **Download ZIP**
3. Open your Downloads folder
4. Right-click the ZIP file and select **Extract All** (Windows) or double-click (Mac)
5. You now have a folder called `datashield` containing `index.html`

**Option B: Clone with Git**

```bash
git clone https://github.com/YOUR_USERNAME/datashield.git
```

---

### Step 2 — Install Python (one-time setup)

DataShield uses Python's built-in web server. You only need to do this once.

#### On Mac

Mac comes with Python pre-installed. Open Terminal and check:

```bash
python3 --version
```

If you see a version number, skip to Step 3. If not, download Python from [python.org/downloads](https://python.org/downloads) and run the installer.

#### On Windows

1. Open Command Prompt — press `Windows key + R`, type `cmd`, press Enter
2. Type the following and press Enter:

```
python3 --version
```

3. If you see a version number (e.g. `Python 3.11.2`), Python is already installed. Skip to Step 3.

4. If you see **"Python was not found"**, you need to install it:
   - Go to [python.org/downloads](https://python.org/downloads) in Chrome
   - Click the big yellow **Download Python** button
   - Open the downloaded `.exe` file
   - ⚠️ **On the first screen of the installer, tick the checkbox that says "Add Python to PATH"** — this is at the bottom of the screen. If you skip this, the commands below will not work.
   - Click **Install Now**
   - Wait for the installation to finish, then click **Close**
   - Close Command Prompt and open it again (important — old windows do not pick up the new installation)

5. Verify the installation worked:

```
python --version
```

You should now see a version number.

---

### Step 3 — Start the Server

Open Terminal (Mac) or Command Prompt (Windows).

Navigate to the datashield folder using the `cd` command.

**On Mac:**
```bash
cd Downloads/datashield
```

**On Windows (adjust the path to match where you unzipped the folder):**
```
cd C:\Users\YourName\Downloads\datashield
```

Now start the server:

**On Mac:**
```bash
python3 -m http.server 8000
```

**On Windows — try this first:**
```
python3 -m http.server 8000
```

**On Windows — if the above gives an error, try this instead:**
```
python -m http.server 8000
```

You will see a message like `Serving HTTP on 0.0.0.0 port 8000`. Leave this Terminal or Command Prompt window open while you use the app.

---

### Step 4 — Open in Chrome

Open Chrome and go to:

```
http://localhost:8000
```

DataShield is now running fully on your laptop. All three features work — paste text, image OCR, and PDF upload.

---

### Step 5 — Stop the Server When Done

Go back to the Terminal or Command Prompt window and press:

```
Ctrl + C
```

---

## Show on Your Phone During a Demo

You can open DataShield on your phone while it is running on your laptop, without any internet connection. Both devices must be on the same WiFi network.

**Find your laptop's local IP address:**

On Mac — open Terminal and run:
```bash
ifconfig | grep 192
```

On Windows — open Command Prompt and run:
```
ipconfig
```
Look for the line that says **IPv4 Address**. It will look something like `192.168.1.42`.

**On your phone:**

Open Chrome and go to `http://192.168.1.42:8000` (replace with your actual IP address).

The full app runs on your phone, served from your laptop. Still 100% local — no internet required.

---

## Deploy to GitHub Pages (Free, Permanent URL)

If you want a shareable link that anyone can open without running a server:

1. Push this repo to GitHub (must be a public repository)
2. Go to **Settings → Pages** in the left sidebar
3. Under **Branch**, select `main` and click **Save**
4. Wait about 60 seconds
5. Your app is live at `https://YOUR_USERNAME.github.io/datashield/`

**Is athlete data safe even though the code is on GitHub?**

Yes. GitHub only hosts the code — the HTML, CSS, and JavaScript. Think of it like a vending machine that hands you a sealed notebook. The vending machine knows what the notebook looks like, but has no idea what you write inside it. Everything users do inside the app — documents uploaded, names entered, masked output — is processed entirely inside their browser. Nothing is sent to GitHub or anywhere else.

---

## What Works Where

| Feature | Double-click index.html | Localhost server | GitHub Pages |
|---------|------------------------|------------------|--------------|
| Paste Text → full flow | ✅ | ✅ | ✅ |
| Upload PDF → full flow | ✅ | ✅ | ✅ |
| Download TXT | ✅ | ✅ | ✅ |
| Download PDF | ✅ | ✅ | ✅ |
| Copy to clipboard | ✅ | ✅ | ✅ |
| Image OCR (handwritten notes) | ❌ | ✅ | ✅ |

Image OCR requires a server because the OCR engine (Tesseract.js) uses Web Workers, which browsers only allow when a page is served over HTTP — not when opened directly as a file.

---

## Technical Details

### Architecture

DataShield is a single HTML file with zero backend dependencies. Everything runs client-side:

- **OCR Engine:** Tesseract.js v5.1.1 — offline text recognition from images
- **PDF Reader:** Mozilla pdf.js v3.11.174 — client-side PDF text extraction
- **PDF Generator:** jsPDF v2.5.1 — creates downloadable masked PDFs
- **Font:** Plus Jakarta Sans via Google Fonts

### Name Detection Engine

The detection uses a three-tier strategy:

1. **Labeled names (high confidence):** Names after `Athlete:`, `Coach:`, `Dr.`, `Signed:`, `Reviewed by:`
2. **Contextual names (medium confidence):** Names in action context — "Neeraj reported", "briefed Sandeep", "partner Tarun Dhillon"
3. **Repeated capitalized pairs (lower confidence):** Two-word capitalized phrases appearing 2 or more times in the document

Every candidate is checked against a 200+ term exclusion list covering lab parameters, anatomy, medical procedures, sports science terms, and document vocabulary — so terms like "Normal Haematocrit", "Right Knee", "Therapeutic Use Exemption", and "Training Load" are never flagged as names.

### File Structure

```
datashield/
├── index.html    # Complete application — single file, no dependencies
└── README.md     # This file
```

---

## Use Cases

- **Sports Nutritionists** — mask athlete names in diet logs and supplement trackers before asking AI to analyse nutrition gaps
- **Sports Scientists** — anonymise blood reports and training load data before using AI for pattern detection
- **Physiotherapists** — remove athlete identity from injury notes before getting AI-assisted treatment suggestions
- **Team Doctors** — sanitise medical records before using AI for analysis
- **Coaches** — anonymise performance data before AI tactical analysis
- **Any team handling confidential data** — HR records, legal documents, financial reports

---

## The Idea Behind This

This app was built using [Claude](https://claude.ai) by Anthropic as part of an AI literacy demonstration for enterprise teams. It demonstrates a principle we teach at [AI&Beyond](https://aiandbeyond.ai):

> *AI tools become safe to use once you remove the barrier — and the barrier is almost always about data, not capability.*

DataShield exists because a sports science team wanted to use AI but could not risk athlete privacy. The solution was not to avoid AI. It was to make the data safe first.

---

## About AI&Beyond

[AI&Beyond](https://aiandbeyond.ai) is an enterprise AI literacy and training company delivering customised AI bootcamps across industries. Co-founded by Jaspreet Bindra and Anuj Magazine.

---

## License

MIT License — free to use, modify, and distribute.

---

## Contributing

Found a bug or have a feature idea? Open an issue or submit a pull request. Contributions welcome.

---

**Made with 🛡 for athlete privacy.**
