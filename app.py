"""
To Mr. Robot
A personal response & interactive digital letter from Ishu to Nachiket.
Built with Python, Streamlit, and Custom CSS. Ready for Streamlit Community Cloud.
"""

import streamlit as st

# -----------------------------------------------------------------------------
# PAGE CONFIGURATION
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="To Mr. Robot",
    page_icon="🦋",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# -----------------------------------------------------------------------------
# SESSION STATE INITIALIZATION
# -----------------------------------------------------------------------------
if "current_step" not in st.session_state:
    st.session_state.current_step = 1  # 1 to 14
if "card_index" not in st.session_state:
    st.session_state.card_index = 0  # 0 to 10 for Screen 9
if "answers" not in st.session_state:
    st.session_state.answers = {}
if "exact_moment" not in st.session_state:
    st.session_state.exact_moment = ""
if "music_playing" not in st.session_state:
    st.session_state.music_playing = False

# -----------------------------------------------------------------------------
# DEDICATED CUSTOM CSS INJECTION
# -----------------------------------------------------------------------------
def inject_custom_css():
    """Injects high-end dark luxury styling and hides Streamlit default chrome."""
    custom_css = """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

    /* Hide Streamlit default chrome */
    #MainMenu { visibility: hidden !important; }
    footer { visibility: hidden !important; }
    header { visibility: hidden !important; }
    [data-testid="stToolbar"] { display: none !important; }
    [data-testid="stDecoration"] { display: none !important; }
    [data-testid="stStatusWidget"] { display: none !important; }

    /* Canvas background and dot matrix */
    .stApp {
        background: radial-gradient(circle at top right, #3d0d1a 0%, #1a050b 50%, #0d0205 100%) !important;
        background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px) !important;
        background-size: 40px 40px !important;
        color: #fff1f5 !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        overflow-x: hidden !important;
    }

    /* Ambient Ruby orbs in corners */
    .stApp::before {
        content: "";
        position: fixed;
        top: -100px;
        right: -100px;
        width: 380px;
        height: 380px;
        background: #4d0a1b;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.35;
        pointer-events: none;
        z-index: 0;
    }
    .stApp::after {
        content: "";
        position: fixed;
        bottom: -120px;
        left: -120px;
        width: 450px;
        height: 450px;
        background: #630b1e;
        border-radius: 50%;
        filter: blur(140px);
        opacity: 0.3;
        pointer-events: none;
        z-index: 0;
    }

    /* Luxury Serif Typography */
    .romantic-heading {
        font-family: 'Cormorant Garamond', Georgia, serif !important;
        font-weight: 300 !important;
        font-style: italic !important;
        letter-spacing: 0.02em !important;
        color: #ffffff !important;
        text-shadow: 0 0 25px rgba(255, 192, 203, 0.25) !important;
        line-height: 1.25 !important;
    }

    /* Gradient Divider */
    .glow-divider {
        height: 1px;
        width: 90px;
        margin: 0.75rem auto 1.5rem auto;
        background: linear-gradient(to right, transparent, rgba(244, 114, 182, 0.4), transparent);
    }

    /* Dark Luxury Glassmorphism Card */
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
        position: relative !important;
        text-align: center !important;
    }

    .glass-container-playful {
        background: rgba(255, 255, 255, 0.04) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(251, 191, 36, 0.25) !important;
        border-radius: 36px !important;
        padding: 2.75rem 2.25rem !important;
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.18) !important;
        margin: 1rem auto 1.5rem auto !important;
        max-width: 580px !important;
        position: relative !important;
        text-align: center !important;
    }

    /* Meta badge */
    .meta-badge {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.65rem;
        font-family: monospace;
        letter-spacing: 0.28em;
        color: rgba(253, 164, 175, 0.55);
        text-transform: uppercase;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 0.75rem;
        margin-bottom: 1.5rem;
    }

    /* Letter Body Text */
    .letter-text {
        font-size: 1.05rem;
        font-weight: 300;
        line-height: 1.85;
        color: rgba(255, 241, 245, 0.88);
        margin: 1.5rem 0;
        white-space: pre-line;
    }

    /* Highlight badge on screen 12 */
    .highlight-pill {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(244, 63, 94, 0.25);
        border-radius: 16px;
        padding: 0.85rem 1.5rem;
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-size: 1.15rem;
        color: #fbcfe8;
        display: inline-block;
        margin: 1rem auto;
        box-shadow: 0 0 25px rgba(225, 29, 72, 0.15);
    }

    /* Sender signature */
    .signature-text {
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-size: 1.5rem;
        color: #fbcfe8;
        text-align: right;
        margin-top: 1.5rem;
        padding-right: 1rem;
    }

    /* Butterfly Animation */
    @keyframes flutter {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(4deg); }
    }
    .butterfly-icon {
        display: inline-block;
        animation: flutter 3s ease-in-out infinite;
        font-size: 1.8rem;
    }

    /* Streamlit Button Customization */
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
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
        width: 100% !important;
        min-height: 48px !important;
    }
    div.stButton > button:hover {
        background: linear-gradient(to right, #a01a3c, #70122a) !important;
        box-shadow: 0 0 40px rgba(160, 26, 60, 0.55) !important;
        transform: translateY(-1px) !important;
        color: #ffffff !important;
    }

    /* Secondary / Back Buttons */
    div.stButton > button[kind="secondary"] {
        background: rgba(255, 255, 255, 0.04) !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        color: rgba(255, 241, 245, 0.75) !important;
        box-shadow: none !important;
    }
    div.stButton > button[kind="secondary"]:hover {
        background: rgba(255, 255, 255, 0.09) !important;
        color: #ffffff !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
    }

    /* Music Player Badge */
    .music-bar {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 9999px;
        padding: 0.4rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
    }
    </style>
    """
    st.markdown(custom_css, unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# DATA: 9 THINGS THAT MATTER TO ME (SCREEN 9)
# -----------------------------------------------------------------------------
MATTER_CARDS = [
    {
        "id": 1,
        "question": "Will you be real with me?",
        "supporting": "Not just when everything is easy,\nbut even when things get complicated.",
    },
    {
        "id": 2,
        "question": "Will you help me trust you?",
        "supporting": "I can't force myself to trust.\nI need your actions to make me believe in you.",
    },
    {
        "id": 3,
        "question": "Will you choose me daily? 🦋",
        "supporting": "Not just when the butterflies are there,\nbut also on ordinary days.",
    },
    {
        "id": 4,
        "question": "Will you be there for me?",
        "supporting": "Even when I'm emotional, confused,\nor having a difficult day.",
    },
    {
        "id": 5,
        "question": "Will you share things with me?",
        "supporting": "Your thoughts.\nYour worries.\nYour happiness.\nThe things you don't usually tell everyone.",
    },
    {
        "id": 6,
        "question": "Will you wait for me?",
        "supporting": "Will you give me the time I need\nto believe you and believe in this?",
    },
    {
        "id": 7,
        "question": "Will you handle my tantrums?",
        "supporting": "I know I can be stubborn and difficult sometimes.\nI just want someone who tries to understand me\ninstead of giving up.",
    },
    {
        "id": 8,
        "question": "Will you help me grow?",
        "supporting": "Teach me.\nSupport me.\nChallenge me.\nHelp me become better,\nespecially when it comes to my career and my dreams.",
    },
    {
        "id": 9,
        "question": "Will you respect me?",
        "supporting": "My boundaries.\nMy choices.\nMy opinions.\nMy career.\nMy dreams.\n\nEven when you don't agree with me.",
    },
    {
        "id": 10,
        "question": "Will you listen to my bak-bak without getting bored? 🥺🎧",
        "supporting": "I have so many random stories, thoughts, and silly jokes.\nI need someone who genuinely loves hearing my voice,\neven when I ramble on and on.",
    },
    {
        "id": 11,
        "question": "Will you remember what I share with you? 💭",
        "supporting": "The little things.\nWhat makes me smile, my fears, my small quirks.\nBecause paying attention to what I share\nmeans everything to me.",
    },
]

# -----------------------------------------------------------------------------
# HEADER & SONG: RAIT ZARA SI
# -----------------------------------------------------------------------------
def render_header():
    """Renders the top bar with App Title, Subtitle, and Rait Zara Si song choice."""
    st.markdown(
        """
        <div style="text-align: center; margin-bottom: 0.75rem;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(253, 164, 175, 0.6); font-family: monospace;">
                    To Mr. Robot
                </span>
            </div>
            <div style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.95rem; color: rgba(255, 241, 245, 0.65); letter-spacing: 0.02em;">
                "Some things are easier to say when you don't have to say them out loud."
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # Ambient Music Controller for "Rait Zara Si"
    with st.expander("🎵 Song Choice: Rait Zara Si (Atrangi Re)"):
        st.markdown(
            """
            <div style="font-size: 0.85rem; color: rgba(255, 241, 245, 0.8); line-height: 1.6; margin-bottom: 0.5rem;">
                <em>"Rait zara si hai, haath se phisalti hai..."</em><br>
                This letter is best read with the soft, soulful instrumental of <strong>Rait Zara Si</strong> playing quietly in the background.
            </div>
            """,
            unsafe_allow_html=True,
        )
        # Embedded web audio player for gentle ambient instrumental
        st.markdown(
            """
            <audio controls style="width: 100%; height: 36px; border-radius: 18px; outline: none;">
                <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-ambient-112199.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            """,
            unsafe_allow_html=True,
        )


# -----------------------------------------------------------------------------
# SCREEN 1 — INTRO
# -----------------------------------------------------------------------------
def show_intro():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Personal Letter</span>
                <span>01 / 13</span>
            </div>
            <h1 class="romantic-heading" style="font-size: 2.3rem;">Hey, Mr. Robot.</h1>
            <div class="glow-divider"></div>
            <div class="letter-text">
So... you asked me a lot of things.

And I could have answered them normally.

But I thought maybe some things deserve a little more honesty.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    if st.button("Okay, I'm listening →", key="btn_s1"):
        st.session_state.current_step = 2
        st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 2 — MY HONEST ANSWER
# -----------------------------------------------------------------------------
def show_response():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>My Honest Answer</span>
                <span>02 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.2rem;">I'll give you a chance.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I'll give you a chance... but I'm not going to lie,
I'm still not completely sure.

I have my own trust issues, and right now I can't say
'I love you' because I don't want to say something
just because the moment feels right.

And honestly, I'm not even sure if what you're feeling
is really falling for me, or if you've just fallen for
the idea of me.

Maybe you're confused right now...
and maybe I am too.

But we'll see where this goes.

I'm willing to give it my 100%.

Maybe, somewhere along the way,
I'll fall for you too.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s2"):
            st.session_state.current_step = 1
            st.rerun()
    with col2:
        if st.button("There's more →", key="btn_s2"):
            st.session_state.current_step = 3
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 3 — I REALLY DO LIKE YOU
# -----------------------------------------------------------------------------
def show_screen_3():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Feelings</span>
                <span>03 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">But one thing I am sure about...</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I really do like you.

I genuinely love talking to you.

Sometimes, when you're busy or unavailable,
I actually miss you.

And sometimes I catch myself thinking...

'Maybe this is the ending.'

And that thought scares me more than I expected.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s3"):
            st.session_state.current_step = 2
            st.rerun()
    with col2:
        if st.button("Keep going →", key="btn_s3"):
            st.session_state.current_step = 4
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 4 — THE MOMENT
# -----------------------------------------------------------------------------
def show_screen_4():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>The Moment</span>
                <span>04 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">Do you know what my first thought was?</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
When you told me that you liked me
and asked if I could be your Preeti...

my first thought was:

<strong>'Shit... now everything will change.
I'm going to lose him.'</strong>

And honestly, that surprised me.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s4"):
            st.session_state.current_step = 3
            st.rerun()
    with col2:
        if st.button("Why? →", key="btn_s4"):
            st.session_state.current_step = 5
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 5 — WHY I WAS SO CALM
# -----------------------------------------------------------------------------
def show_screen_5():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Reflection</span>
                <span>05 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">I've never really handled something like this.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I've never acted this calm in a situation like this before.

I didn't sit and think about what I should say.
I didn't plan how I should react.

It just happened.

With you, being calm around all of this
came naturally.
            </div>
            <div style="font-family: 'Cormorant Garamond', serif; font-style: italic; color: rgba(253, 164, 175, 0.6); font-size: 0.85rem; margin-top: 1rem;">
                • a quiet moment •
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s5"):
            st.session_state.current_step = 4
            st.rerun()
    with col2:
        if st.button("There's something I need from you →", key="btn_s5"):
            st.session_state.current_step = 6
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 6 — TRUST
# -----------------------------------------------------------------------------
def show_trust():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Trust</span>
                <span>06 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">Trust isn't that simple for me.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I really want to trust you.

But trust isn't something I can just decide to give.

It's something you'll have to build with me.

Slowly.

Through your actions.
Through your consistency.
Through showing me that what you're feeling is real.

I might take time.
I might overthink sometimes.

But that doesn't mean I don't care.

I just need to feel safe enough to believe you.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s6"):
            st.session_state.current_step = 5
            st.rerun()
    with col2:
        if st.button("Next →", key="btn_s6"):
            st.session_state.current_step = 7
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 7 — CONSISTENCY
# -----------------------------------------------------------------------------
def show_screen_7():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Consistency</span>
                <span>07 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">I want consistency.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I don't want you to be there today
and suddenly disappear tomorrow.

If you genuinely feel something for me,
I want you to be sure before taking this step.

Because once I let someone in,
it becomes really difficult for me to let them go.

I can't ask you to promise me forever.

But I need to know that you're choosing this
because you genuinely want me,
not because of a temporary feeling.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s7"):
            st.session_state.current_step = 6
            st.rerun()
    with col2:
        if st.button("Next →", key="btn_s7"):
            st.session_state.current_step = 8
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 8 — IF THINGS EVER CHANGE
# -----------------------------------------------------------------------------
def show_screen_8():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>A Promise</span>
                <span>08 / 13</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">One thing I need you to promise me...</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
If someday you feel differently,
please don't just disappear.

Don't stop halfway without telling me.

Talk to me.
Be honest with me.

Because being left halfway
would hurt me more than an honest truth.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s8"):
            st.session_state.current_step = 7
            st.rerun()
    with col2:
        if st.button("Next →", key="btn_s8"):
            st.session_state.card_index = 0
            st.session_state.current_step = 9
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 9 — THE THINGS I WANT (9 INTERACTIVE CARDS)
# -----------------------------------------------------------------------------
def show_question():
    card_idx = st.session_state.card_index
    total = len(MATTER_CARDS)
    card = MATTER_CARDS[card_idx]

    butterfly_html = '<div class="butterfly-icon">🦋</div>' if "🦋" in card["question"] else ''

    st.markdown(
        f"""
        <div class="glass-container">
            <div class="meta-badge">
                <span>What Matters To Me</span>
                <span>Card 0{card_idx + 1} / 0{total}</span>
            </div>
            {butterfly_html}
            <h2 class="romantic-heading" style="font-size: 2.1rem;">{card["question"]}</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
{card["supporting"]}
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Yes ❤️", key=f"btn_yes_{card['id']}"):
            st.session_state.answers[card["id"]] = "Yes ❤️"
            if card_idx + 1 < total:
                st.session_state.card_index += 1
            else:
                st.session_state.current_step = 10
            st.rerun()

    with col2:
        if st.button("I'll try", key=f"btn_try_{card['id']}"):
            st.session_state.answers[card["id"]] = "I'll try"
            if card_idx + 1 < total:
                st.session_state.card_index += 1
            else:
                st.session_state.current_step = 10
            st.rerun()

    if card_idx > 0:
        if st.button("← Previous Card", key="btn_prev_card"):
            st.session_state.card_index -= 1
            st.rerun()
    else:
        if st.button("← Back to Letter", key="btn_prev_to_s8"):
            st.session_state.current_step = 8
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 10 — A LITTLE TEASING (PLAYFUL)
# -----------------------------------------------------------------------------
def show_screen_10():
    st.markdown(
        """
        <div class="glass-container-playful">
            <div class="meta-badge" style="color: rgba(251, 191, 36, 0.7);">
                <span>A Little Teasing</span>
                <span>10 / 14</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem; color: #fef3c7 !important;">
                One very important question, Mr. Robot...
            </h2>
            <div class="glow-divider" style="background: linear-gradient(to right, transparent, rgba(251, 191, 36, 0.4), transparent);"></div>
            <div class="letter-text" style="color: rgba(254, 243, 199, 0.9);">
Will you make me laugh,
tease me,
annoy me just a little,
and still somehow make me want to talk to you every day?
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s10"):
            st.session_state.card_index = len(MATTER_CARDS) - 1
            st.session_state.current_step = 9
            st.rerun()
    with col2:
        if st.button("Obviously 😂", key="btn_s10"):
            st.session_state.current_step = 11
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 11 — I'M NOT ASKING FOR FOREVER
# -----------------------------------------------------------------------------
def show_screen_11():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Honest Truth</span>
                <span>11 / 14</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">I'm not asking for forever.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I know nobody can promise what the future will look like.

I'm not asking you to promise me forever.

I'm asking you to be genuine with me.

Be consistent.
Communicate with me.
Respect me.
Give me time.
And choose this because you actually want to.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s11"):
            st.session_state.current_step = 10
            st.rerun()
    with col2:
        if st.button("Next →", key="btn_s11"):
            st.session_state.current_step = 12
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 12 — THE FINAL ANSWER
# -----------------------------------------------------------------------------
def show_screen_12():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>The Final Answer</span>
                <span>12 / 14</span>
            </div>
            <h2 class="romantic-heading" style="font-size: 2.2rem;">So... let's see where this goes.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
I can't promise you love right now.

But I can promise you that I'm willing to give this
a genuine chance.

I like you.
I love talking to you.
Sometimes I miss you when you're not around.

And maybe...

that's already the beginning of something.

No rushing.
No forcing.
No pretending.

Just two people,
figuring it out along the way.
            </div>
            <div class="highlight-pill">
                Maybe I'll fall for you too. 🦋
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s12"):
            st.session_state.current_step = 11
            st.rerun()
    with col2:
        if st.button("Let's see where this goes →", key="btn_s12"):
            st.session_state.current_step = 13
            st.rerun()


# -----------------------------------------------------------------------------
# SCREEN 13 — EXACT BUTTERFLY MOMENT
# -----------------------------------------------------------------------------
def show_exact_moment():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>One Question For You</span>
                <span>13 / 14</span>
            </div>
            <div style="margin-bottom: 0.5rem;"><span class="butterfly-icon">🦋</span></div>
            <h2 class="romantic-heading" style="font-size: 2.1rem;">Now tell me, Mr. Robot...</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
Tell me the exact moment when you fell for me
and felt butterflies in your stomach.
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    moment_input = st.text_area(
        "Your honest confession to Ishu:",
        value=st.session_state.exact_moment,
        placeholder="Was it something I said? A moment on a call? Or when you realized you couldn't stop thinking about me...",
        key="moment_textarea",
        height=130,
    )

    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("← Back", key="btn_prev_s13"):
            st.session_state.current_step = 12
            st.rerun()
    with col2:
        if st.button("Lock this moment in my log →", key="btn_save_moment"):
            st.session_state.exact_moment = moment_input.strip()
            # Save to log file
            save_log_file()
            st.session_state.current_step = 14
            st.rerun()


# -----------------------------------------------------------------------------
# HELPER: CONFESSION LOG GENERATION
# -----------------------------------------------------------------------------
def generate_log_text():
    from datetime import datetime
    now_str = datetime.now().strftime("%A, %B %d, %Y at %I:%M %p")
    lines = [
        "============================================================",
        "💌 TO MR. ROBOT — ISHU'S CONFESSION & ANSWERS LOG FILE 💌",
        "============================================================",
        f"Generated on : {now_str}",
        "Recipient    : Mr. Robot (Nachiket)",
        "From         : Ishu",
        "Soundtrack   : Rait Zara Si (Atrangi Re)",
        "------------------------------------------------------------\n",
        "🦋 [HIS EXACT BUTTERFLY MOMENT]",
        f'"{st.session_state.exact_moment.strip()}"' if st.session_state.exact_moment.strip() else "(Awaiting Mr. Robot's answer)",
        "\n------------------------------------------------------------",
        "📋 [HIS ANSWERS TO WHAT MATTERS TO ME]",
        "------------------------------------------------------------",
    ]
    for idx, card in enumerate(MATTER_CARDS):
        ans = st.session_state.answers.get(card["id"], "Pending / Not answered")
        lines.append(f"Card [{idx+1:02d}/{len(MATTER_CARDS):02d}]: {card['question']}")
        lines.append(f"   His Answer : {ans}")
        lines.append("")
    lines.append("------------------------------------------------------------")
    lines.append(f"SUMMARY STATS : {len(st.session_state.answers)} of {len(MATTER_CARDS)} answered")
    lines.append("INTEGRITY     : Safely stored in Ishu's diary log")
    lines.append("============================================================\n")
    return "\n".join(lines)


def save_log_file():
    try:
        log_content = generate_log_text()
        with open("mr_robot_confession_log.txt", "w", encoding="utf-8") as f:
            f.write(log_content)
    except Exception as e:
        pass


# -----------------------------------------------------------------------------
# FINAL SCREEN — SIGNED ISHU (SCREEN 14)
# -----------------------------------------------------------------------------
def show_final():
    st.markdown(
        """
        <div class="glass-container">
            <div class="meta-badge">
                <span>Final Note</span>
                <span>14 / 14</span>
            </div>
            <div style="margin-bottom: 0.5rem;"><span class="butterfly-icon">🦋</span></div>
            <h2 class="romantic-heading" style="font-size: 2.3rem;">One last thing, Mr. Robot.</h2>
            <div class="glow-divider"></div>
            <div class="letter-text">
Thank you for making me feel something
I wasn't expecting to feel.

I don't know exactly where this story ends.

But I'm willing to find out.

With you.
            </div>
            <div class="signature-text">
                — Ishu
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # Mr. Robot's Butterfly Moment Callout
    if st.session_state.exact_moment:
        st.markdown(
            f"""
            <div class="glass-container" style="padding: 1.5rem !important; border-color: rgba(244, 114, 182, 0.4) !important;">
                <div style="font-size: 0.7rem; font-family: monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #f472b6; margin-bottom: 0.5rem;">
                    🦋 Your exact butterfly moment:
                </div>
                <div style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15rem; color: #fff1f5; line-height: 1.6;">
                    "{st.session_state.exact_moment}"
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    # Confession File & Log Section with Download
    log_data = generate_log_text()
    save_log_file()

    st.markdown(
        """
        <div style="text-align: center; margin: 1rem 0; font-family: monospace; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(253, 164, 175, 0.7);">
            📁 Confession File & Answers Log: mr_robot_confession_log.txt
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.download_button(
        label="📥 Download Confession Log File (.txt)",
        data=log_data,
        file_name="mr_robot_confession_log.txt",
        mime="text/plain",
        key="btn_download_log",
    )

    with st.expander("📜 View Complete Confession Log & Answers"):
        st.code(log_data, language="text")

    if st.button("Read from the beginning", key="btn_restart"):
        st.session_state.current_step = 1
        st.session_state.card_index = 0
        st.session_state.answers = {}
        st.session_state.exact_moment = ""
        st.rerun()


# -----------------------------------------------------------------------------
# MAIN APPLICATION ROUTER
# -----------------------------------------------------------------------------
def main():
    inject_custom_css()
    render_header()

    step = st.session_state.current_step

    if step == 1:
        show_intro()
    elif step == 2:
        show_response()
    elif step == 3:
        show_screen_3()
    elif step == 4:
        show_screen_4()
    elif step == 5:
        show_screen_5()
    elif step == 6:
        show_trust()
    elif step == 7:
        show_screen_7()
    elif step == 8:
        show_screen_8()
    elif step == 9:
        show_question()
    elif step == 10:
        show_screen_10()
    elif step == 11:
        show_screen_11()
    elif step == 12:
        show_screen_12()
    elif step == 13:
        show_exact_moment()
    elif step == 14:
        show_final()


if __name__ == "__main__":
    main()
