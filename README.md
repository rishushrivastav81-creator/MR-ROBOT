# To Mr. Robot 🦋

> *"Some things are easier to say when you don't have to say them out loud."*

A personal response and interactive digital letter from **Ishu** to **Nachiket** ("Mr. Robot").

Designed as a modern, mobile-first, dark luxury interactive web application built with **React 19**, **Vite**, **Tailwind CSS**, and **Motion**, engineered for effortless **1-click deployment to GitHub Pages**, Vercel, or Netlify, complete with an **instant scannable QR Code generator** and live share links.

---

## ✨ Features

- **Personal & Honest Tone**: Emotionally vulnerable, mature, warm, slightly playful, and genuine without being cliché or cheesy.
- **Dark Luxury Aesthetic**: Deep blacks, dark burgundy, muted wine gradients, soft blush/pink accents, glassmorphism cards, and delicate serif typography (*Cormorant Garamond*).
- **Background Song Choice ("Rait Zara Si")**: Embedded audio player and Web Audio synthesizer playing the iconic, soulful melody and ambient chords of A.R. Rahman's *Rait Zara Si* (from *Atrangi Re*).
- **14 Interactive Narrative Screens**:
  1. **Intro**: "Hey, Mr. Robot."
  2. **My Honest Answer**: "I'll give you a chance."
  3. **Feelings**: "But one thing I am sure about..." (I really do like you)
  4. **The Moment**: "Do you know what my first thought was?"
  5. **Reflection**: "I've never really handled something like this." (Why I was so calm)
  6. **Trust**: "Trust isn't that simple for me."
  7. **Consistency**: "I want consistency."
  8. **A Promise**: "One thing I need you to promise me..." (If things ever change)
  9. **The Things I Want**: 11 interactive matter cards with "Yes ❤️" and "I'll try" choices (including bak-bak & memory questions).
  10. **A Little Teasing**: Playful question ("Will you bring out my silly side? 😂").
  11. **Honest Truth**: "I'm not asking for forever."
  12. **The Final Answer**: "So... let's see where this goes." / *"Maybe I'll fall for you too. 🦋"*
  13. **His Exact Butterfly Moment**: Confession prompt asking him when he fell and felt butterflies.
  14. **Final Note & Signature**: Signed *"— Ishu"*, with real-time Answers Log file download (.txt), copyable diary summary, and share options.
- **Instant QR Code & Share Modal**:
  - Live QR code generated automatically on-screen.
  - "Download QR Card (PNG)" to send him a romantic digital greeting card.
  - One-click copy link & WhatsApp direct share.
- **Confession File & Answers Log**:
  - Real-time logging of his selections and written butterfly moment.
  - Downloadable `.txt` log file and formatted copyable clipboard text.
- **100% Client-Side & Fast**: Zero Python dependencies or server sleep timers. Loads instantly on any smartphone browser.

---

## 🎵 How to Add the Real Song ("Rait Zara Si" MP3)

You have two easy options to use the real song:

### Option A: Upload directly in the web browser
1. On the website, look at the top navigation bar and click **"Upload Real Song"** (next to the play button).
2. Select or drop your `.mp3` file (e.g., *Rait Zara Si*).
3. The song is saved in your browser's database and will play in full original audio quality whenever you open the letter!

### Option B: Ship it permanently in your GitHub repository (for Mr. Robot / Nachiket)
To ensure the real song plays automatically for Nachiket when he opens your link or scans the QR code from his phone:
1. Save your audio file as `song.mp3`.
2. Place it in the `public/` folder:
   ```text
   public/song.mp3
   ```
3. Commit and push:
   ```bash
   git add public/song.mp3
   git commit -m "Add real Rait Zara Si audio file"
   git push
   ```
4. The website will automatically detect `public/song.mp3` and play the authentic original audio track for anyone visiting the website!

---

## 🚀 Easy 1-Minute Deployment to GitHub Pages

This project comes pre-configured with **`.github/workflows/deploy.yml`** for automated GitHub Pages deployment!

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name your repository (e.g. `to-mr-robot` or `letter-for-nachiket`)
3. Choose **Public** (or Private with GitHub Pro) and create the repository.

### Step 2: Push your code
In your terminal, run:
```bash
git init
git add .
git commit -m "Initial commit of To Mr. Robot interactive letter"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select:
   👉 **GitHub Actions**
4. The workflow will automatically trigger, build the Vite app, and publish it!
5. Your live URL will be:
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

### Step 4: Share via Link or QR Code!
- Open your live site, click **Share & QR** in the top bar.
- Copy your URL or click **Download QR Card (PNG)** to send him a romantic scannable image!

---

## ⚡ Alternative Instant Deploy: Vercel or Netlify

1. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
2. Connect your GitHub account and import this repository.
3. Keep default settings (`Framework: Vite`, `Build: npm run build`, `Output: dist`).
4. Click **Deploy** — your letter is live with a custom HTTPS URL in 15 seconds!

---

## 💻 Local Development

```bash
# Install packages
npm install

# Start development server
npm run dev

# Build production static site
npm run build
```
