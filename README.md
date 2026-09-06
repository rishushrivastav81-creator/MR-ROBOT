# To Mr. Robot 🦋

> *"Some things are easier to say when you don't have to say them out loud."*

A personal response and interactive digital letter from **Ishu** to **Nachiket** ("Mr. Robot").

Designed as a modern, mobile-first, dark luxury interactive experience built with **Python**, **Streamlit**, and **Custom CSS**, ready for direct deployment on **Streamlit Community Cloud** or as a full React/Vite web application.

---

## ✨ Features

- **Personal & Honest Tone**: Emotionally vulnerable, mature, warm, slightly playful, and genuine without being cliché or cheesy.
- **Dark Luxury Aesthetic**: Deep blacks, dark burgundy, muted wine gradients, soft blush/pink accents, glassmorphism cards, and delicate serif typography (*Cormorant Garamond*).
- **Background Song Choice ("Rait Zara Si")**: Embedded audio player and Web Audio synthesizer playing the iconic, soulful melody and ambient chords of A.R. Rahman's *Rait Zara Si* (from *Atrangi Re*).
- **13 Interactive Narrative Screens**:
  1. **Intro**: "Hey, Mr. Robot."
  2. **My Honest Answer**: "I'll give you a chance."
  3. **Feelings**: "But one thing I am sure about..." (I really do like you)
  4. **The Moment**: "Do you know what my first thought was?"
  5. **Reflection**: "I've never really handled something like this." (Why I was so calm)
  6. **Trust**: "Trust isn't that simple for me."
  7. **Consistency**: "I want consistency."
  8. **A Promise**: "One thing I need you to promise me..." (If things ever change)
  9. **The Things I Want**: 9 interactive matter cards with "Yes ❤️" and "I'll try" choices.
  10. **Ukaduche Madak**: Playful question ("Will you bring out my ukaduche madak side? 😂").
  11. **Honest Truth**: "I'm not asking for forever."
  12. **The Final Answer**: "So... let's see where this goes." / *"Maybe I'll fall for you too. 🦋"*
  13. **Final Screen**: "One last thing, Mr. Robot." signed *"— Ishu"*, with privacy badge *"Your answers are safe here."*
- **Privacy First**: Interactive choices are kept securely in `session_state` without third-party tracking or databases.
- **Zero Streamlit Chrome**: Streamlit's default headers, menus, and footers are cleanly hidden for a bespoke web experience.

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.9 or higher
- pip

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Streamlit application
```bash
streamlit run app.py
```

Open `http://localhost:8501` on your phone or desktop browser.

---

## 🌐 How to Deploy to Streamlit Community Cloud

1. Push this repository to **GitHub**.
2. Go to [share.streamlit.io](https://share.streamlit.io) and log in with your GitHub account.
3. Click **"New app"**.
4. Select your repository, set the branch to `main`, and enter `app.py` as the main file path.
5. Click **"Deploy!"**
6. You will receive an instant, shareable HTTPS link to send directly to Nachiket.

---

## 📁 Project Structure

```text
├── app.py              # Modular Streamlit app (show_intro, show_response, show_trust, show_question, show_final)
├── requirements.txt    # Clean requirements (streamlit>=1.35.0)
├── README.md           # Project documentation & deployment guide
├── .gitignore          # Standard ignore rules
├── index.html          # Web preview entry point
├── src/                # React / Vite interactive web preview
│   ├── App.tsx         # Main interactive story router & state engine
│   ├── components/     # MusicPlayer (Rait Zara Si), StoryCard, QuestionCard, FinalScreen
│   ├── data/           # Story content & export strings
│   └── types.ts        # TypeScript definitions
```
