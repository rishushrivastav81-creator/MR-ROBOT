export const APP_PY_CONTENT = `"""
To Mr. Robot
A personal response & interactive digital letter from Ishu to Nachiket.
Built with Python, Streamlit, and Custom CSS. Ready for Streamlit Community Cloud.
"""

import streamlit as st

st.set_page_config(
    page_title="To Mr. Robot",
    page_icon="🦋",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# SESSION STATE INITIALIZATION
if "current_step" not in st.session_state:
    st.session_state.current_step = 1  # 1 to 14
if "card_index" not in st.session_state:
    st.session_state.card_index = 0  # 0 to 10 for Screen 9
if "answers" not in st.session_state:
    st.session_state.answers = {}
if "exact_moment" not in st.session_state:
    st.session_state.exact_moment = ""

def inject_custom_css():
    custom_css = """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

    #MainMenu, footer, header { visibility: hidden !important; }
    [data-testid="stToolbar"], [data-testid="stDecoration"], [data-testid="stStatusWidget"] { display: none !important; }

    .stApp {
        background: radial-gradient(circle at top right, #3d0d1a 0%, #1a050b 50%, #0d0205 100%) !important;
        background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px) !important;
        background-size: 40px 40px !important;
        color: #fff1f5 !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
    }

    .romantic-heading {
        font-family: 'Cormorant Garamond', Georgia, serif !important;
        font-weight: 300 !important;
        font-style: italic !important;
        color: #ffffff !important;
        text-shadow: 0 0 25px rgba(255, 192, 203, 0.25) !important;
    }

    .glass-container {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 36px !important;
        padding: 2.75rem 2.25rem !important;
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 21, 51, 0.2) !important;
        margin: 1rem auto 1.5rem auto !important;
        max-width: 580px !important;
        text-align: center !important;
    }

    .letter-text {
        font-size: 1.05rem;
        font-weight: 300;
        line-height: 1.85;
        color: rgba(255, 241, 245, 0.88);
        margin: 1.5rem 0;
        white-space: pre-line;
    }

    div.stButton > button {
        background: linear-gradient(to right, #8b1533, #5a0e22) !important;
        color: #ffffff !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        border-radius: 9999px !important;
        padding: 0.75rem 2rem !important;
        font-size: 0.82rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.18em !important;
        box-shadow: 0 0 30px rgba(139, 21, 51, 0.35) !important;
        width: 100% !important;
        min-height: 48px !important;
    }
    </style>
    """
    st.markdown(custom_css, unsafe_allow_html=True)

# Main app with screens 1 through 14 (Rait Zara Si theme & Exact Butterfly Moment question)
`;

export const REQUIREMENTS_CONTENT = `streamlit>=1.35.0
`;

export const README_CONTENT = `# To Mr. Robot 🦋
A personal response & interactive digital letter from Ishu to Nachiket.

## Features
- Personal, emotionally vulnerable, and mature tone
- Song Choice: Rait Zara Si (Atrangi Re)
- 14 narrative steps including interactive cards, playful teasing, and the butterfly moment question
- Real-time Confession File & Log system with .txt / JSON export and Ishu's secret diary viewer
- 100% Streamlit Community Cloud ready!

## Deploying
1. Push to GitHub
2. Connect to share.streamlit.io
3. Set main file to app.py
`;

