import { NarrativeScreen, MatterCard } from '../types';

export const APP_INFO = {
  title: 'To Mr. Robot',
  subtitle: "Some things are easier to say when you don't have to say them out loud.",
  recipientName: 'Nachiket',
  nickname: 'Mr. Robot',
  senderSignature: '— Ishu',
};

export const SCREENS: Record<number, NarrativeScreen> = {
  1: {
    id: 1,
    badge: '01 / 14',
    category: 'Intro',
    heading: 'Hey, Mr. Robot.',
    text: `So... you asked me a lot of things.

And I could have answered them normally.

But I thought maybe some things deserve a little more honesty.`,
    buttonText: "Okay, I'm listening →",
  },
  2: {
    id: 2,
    badge: '02 / 14',
    category: 'My Honest Answer',
    heading: "I'll give you a chance.",
    text: `I'll give you a chance... but I'm not going to lie,
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
I'll fall for you too.`,
    buttonText: "There's more →",
  },
  3: {
    id: 3,
    badge: '03 / 14',
    category: 'Feelings',
    heading: 'But one thing I am sure about...',
    text: `I really do like you.

I genuinely love talking to you.

Sometimes, when you're busy or unavailable,
I actually miss you.

And sometimes I catch myself thinking...

'Maybe this is the ending.'

And that thought scares me more than I expected.`,
    buttonText: 'Keep going →',
  },
  4: {
    id: 4,
    badge: '04 / 14',
    category: 'The Moment',
    heading: 'Do you know what my first thought was?',
    text: `When you told me that you liked me
and asked if I could be your Preeti...

my first thought was:

'Shit... now everything will change.
I'm going to lose him.'

And honestly, that surprised me.`,
    buttonText: 'Why? →',
  },
  5: {
    id: 5,
    badge: '05 / 14',
    category: 'Reflection',
    heading: "I've never really handled something like this.",
    text: `I've never acted this calm in a situation like this before.

I didn't sit and think about what I should say.
I didn't plan how I should react.

It just happened.

With you, being calm around all of this
came naturally.`,
    hasPauseAnimation: true,
    buttonText: "There's something I need from you →",
  },
  6: {
    id: 6,
    badge: '06 / 14',
    category: 'Trust',
    heading: "Trust isn't that simple for me.",
    text: `I really want to trust you.

But trust isn't something I can just decide to give.

It's something you'll have to build with me.

Slowly.

Through your actions.
Through your consistency.
Through showing me that what you're feeling is real.

I might take time.
I might overthink sometimes.

But that doesn't mean I don't care.

I just need to feel safe enough to believe you.`,
    buttonText: 'Next →',
  },
  7: {
    id: 7,
    badge: '07 / 14',
    category: 'Consistency',
    heading: 'I want consistency.',
    text: `I don't want you to be there today
and suddenly disappear tomorrow.

If you genuinely feel something for me,
I want you to be sure before taking this step.

Because once I let someone in,
it becomes really difficult for me to let them go.

I can't ask you to promise me forever.

But I need to know that you're choosing this
because you genuinely want me,
not because of a temporary feeling.`,
    buttonText: 'Next →',
  },
  8: {
    id: 8,
    badge: '08 / 14',
    category: 'A Promise',
    heading: 'One thing I need you to promise me...',
    text: `If someday you feel differently,
please don't just disappear.

Don't stop halfway without telling me.

Talk to me.
Be honest with me.

Because being left halfway
would hurt me more than an honest truth.`,
    buttonText: 'Next →',
  },
  10: {
    id: 10,
    badge: '10 / 14',
    category: 'A Little Teasing',
    heading: 'One very important question, Mr. Robot...',
    text: `Will you make me laugh,
tease me,
annoy me a little,
and still somehow make me want to talk to you every single day? 🙈`,
    buttonText: 'Obviously 🥰',
  },
  11: {
    id: 11,
    badge: '11 / 14',
    category: 'Honest Truth',
    heading: "I'm not asking for forever.",
    text: `I know nobody can promise what the future will look like.

I'm not asking you to promise me forever.

I'm asking you to be genuine with me.

Be consistent.
Communicate with me.
Respect me.
Give me time.
And choose this because you actually want to.`,
    buttonText: 'Next →',
  },
  12: {
    id: 12,
    badge: '12 / 14',
    category: 'The Final Answer',
    heading: "So... let's see where this goes.",
    text: `I can't promise you love right now.

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
figuring it out along the way.`,
    highlightText: "Maybe I'll fall for you too. 🦋",
    buttonText: "Now tell me something →",
  },
  13: {
    id: 13,
    badge: '14 / 14',
    category: 'From Ishu',
    heading: 'One last thing, Mr. Robot.',
    text: `Thank you for making me feel something
I wasn't expecting to feel.

I don't know exactly where this story ends.

But I'm willing to find out.

With you.`,
    signature: '— Ishu',
    buttonText: 'Read from the beginning',
  },
};

export const MATTER_CARDS: MatterCard[] = [
  {
    id: 1,
    question: 'Will you be real with me?',
    supporting: 'Not just when everything is easy,\nbut even when things get complicated.',
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 2,
    question: 'Will you help me trust you?',
    supporting: "I can't force myself to trust.\nI need your actions to make me believe in you.",
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 3,
    question: 'Will you choose me daily? 🦋',
    supporting: 'Not just when the butterflies are there,\nbut also on ordinary days.',
    options: ['Yes ❤️', "I'll try"],
    hasButterfly: true,
  },
  {
    id: 4,
    question: 'Will you be there for me?',
    supporting: "Even when I'm emotional, confused,\nor having a difficult day.",
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 5,
    question: 'Will you share things with me?',
    supporting: "Your thoughts.\nYour worries.\nYour happiness.\nThe things you don't usually tell everyone.",
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 6,
    question: 'Will you wait for me?',
    supporting: 'Will you give me the time I need\nto believe you and believe in this?',
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 7,
    question: 'Will you handle my tantrums?',
    supporting: 'I know I can be stubborn and difficult sometimes.\nI just want someone who tries to understand me\ninstead of giving up.',
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 8,
    question: 'Will you help me grow?',
    supporting: 'Teach me.\nSupport me.\nChallenge me.\nHelp me become better,\nespecially when it comes to my career and my dreams.',
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 9,
    question: 'Will you respect me?',
    supporting: "My boundaries.\nMy choices.\nMy opinions.\nMy career.\nMy dreams.\n\nEven when you don't agree with me.",
    options: ['Yes ❤️', "I'll try"],
  },
  {
    id: 10,
    question: 'Will you listen to my bak-bak without getting bored? 🥺🎧',
    supporting: 'Even when I talk non-stop about the most random little things in my day... and my endless thoughts that make sense only to me?',
    options: ['Yes ❤️', "I'll try"],
    doodleType: 'chat',
  },
  {
    id: 11,
    question: 'Will you remember what I share with you? 💭',
    supporting: 'The little details, the things that matter to me, my silly secrets, and the stories I only trust you with.',
    options: ['Yes ❤️', "I'll try"],
    doodleType: 'memory',
  },
];
