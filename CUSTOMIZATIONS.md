# Customization Ideas & Integration Snippets

This file collects practical, copy-pasteable customization ideas for the Quiz App so you can add features later without hunting through files. Each section includes a short description, a tiny "contract" (inputs/outputs), integration notes, and example code snippets intended to be dropped into `index.html`, `style.css` and `script.js`.

---

## 1) Start screen + optional per-question timer

Purpose: show a friendly start screen and optionally enforce a time limit per question.

Contract:

- Inputs: user clicks "Start Quiz"; optional timer duration (seconds).
- Outputs: quiz starts, timer counts down; when timer reaches 0 it behaves like an incorrect selection and reveals the correct answer and shows Next.

Integration notes:

- Add a start screen `div` to `index.html` and hide the main `.quiz` until start.

HTML snippet (add inside `<body>` near the top of `.app`):

<label
    >Time per question (seconds):
<input id="time-per-question" type="number" value="15" min="5" max="300" />
</label>
<button id="start-btn">Start Quiz</button>

</div>
<!-- existing .quiz block stays in the DOM, but hide it initially with CSS -->
```

CSS (small addition to `style.css`):

```css
#start-screen {
  text-align: center;
  margin-bottom: 16px;
}
.quiz {
  display: none;
} /* will be shown when quiz starts */
.quiz.active {
  display: block;
}
#timer {
  font-weight: 600;
  margin-bottom: 12px;
}
```

JS integration (examples to add to `script.js`):

```javascript
// DOM refs for start/timer
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeInput = document.getElementById("time-per-question");
const timerEl = document.createElement("div");
timerEl.id = "timer";
document.querySelector(".quiz").prepend(timerEl);

let timerId = null;
let timeLeft = 0;

function showStartScreen() {
  startScreen.style.display = "block";
  document.querySelector(".quiz").classList.remove("active");
}

function beginQuizFromStart() {
  startScreen.style.display = "none";
  document.querySelector(".quiz").classList.add("active");
  startQuiz(); // reuse your existing function
}

function startTimer(seconds) {
  stopTimer();
  timeLeft = seconds;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      stopTimer();
      // simulate a wrong selection: disable buttons and reveal correct
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

// modify startQuiz or call this on start
startBtn.addEventListener("click", () => {
  const seconds = parseInt(timeInput.value, 10) || 15;
  beginQuizFromStart();
  // when starting, start timer for the first question
  startTimer(seconds);
});

// ensure timer is stopped when user selects an answer or navigates
function selectAnswer(e) {
  stopTimer();
  // existing selectAnswer body follows...
}

// when showing each question, restart the timer with the chosen duration
function showQuestion() {
  resetState();
  const seconds = parseInt(timeInput.value, 10) || 15;
  startTimer(seconds);
  // existing showQuestion body follows...
}
```

Notes:

- You may need to merge the example `selectAnswer`/`showQuestion` edits into your existing definitions so you don't duplicate functions.

---

## 2) Shuffle questions and/or answers

Purpose: make each playthrough feel fresh by randomizing order.

- Inputs: `questions` array.
- Outputs: `questions` array (or answers arrays) shuffled in-place or a shuffled copy.

```javascript
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// To shuffle questions at the start of a quiz:
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(questions);
  nextButton.innerHTML = "Next";
  showQuestion();
}

// To shuffle answers per question before rendering:
function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  shuffleArray(current.answers);
  // render answers as usual
}
```

Notes: If you want repeatable shuffles, seed a PRNG instead of Math.random.

---

## 3) Persist high scores to localStorage

Purpose: keep a small leaderboard or last high score across page reloads.

Contract:

- Inputs: player name (optional), score (number), timestamp.
- Outputs: stored JSON under a key like `quiz_high_scores`.

JS snippets (add to `script.js`):

```javascript
const HIGHSCORE_KEY = "quiz_high_scores";

function getHighScores() {
  const raw = localStorage.getItem(HIGHSCORE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHighScore(name, score) {
  const list = getHighScores();
  list.push({
    name: name || "Anonymous",
    score,
    date: new Date().toISOString(),
  });
  // keep top 10 sorted
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(list.slice(0, 10)));
}

// call saveHighScore when showing final results
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  // optionally save
  saveHighScore(null, score);
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
```

Add a small UI area to display the stored high scores (e.g., a modal or a sidebar) using `getHighScores()`.

---

## 4) Load questions from a JSON file or API

Purpose: separate content from code so quizzes can be updated without editing `script.js`.

Contract:

- Inputs: `questions.json` file or API endpoint returning the questions array in the same shape.
- Outputs: populate the `questions` variable and call `startQuiz()`.

Example `questions.json` (place in project root or `data/questions.json`):

```json
[
  {
    "question": "Which approach primarily uses numerical models?",
    "answers": [
      { "text": "Qualitative", "correct": false },
      { "text": "Quantitative", "correct": true }
    ]
  }
]
```

Fetch snippet (replace/extend your current `questions` declaration):

```javascript
async function loadQuestionsFrom(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // validate minimal shape: array of { question, answers }
    if (Array.isArray(data)) {
      questions.length = 0; // clear current
      data.forEach((q) => questions.push(q));
      startQuiz();
    } else {
      console.error("Invalid question data");
    }
  } catch (err) {
    console.error("Failed to load questions", err);
  }
}

// call on load instead of startQuiz if you want remote data
// loadQuestionsFrom('questions.json');
```

Notes: Use CORS-allowing endpoints for remote APIs. For local `file://` access, serving via HTTP (e.g., `python -m http.server`) is recommended.

---

## 5) Categories / difficulty / filtering

Purpose: let players pick a category or difficulty and filter questions accordingly.

Data shape suggestion (add fields to each question):

```json
{
  "question": "...",
  "category": "GRC",
  "difficulty": "easy",
  "answers": [ ... ]
}
```

Integration idea:

- Add a small form with `select` elements for category and difficulty on the start screen.
- When starting, filter the `questions` array into a working array used by the quiz.

Example (filtering before start):

```javascript
function getFilteredQuestions(category, difficulty) {
  return questions.filter((q) => {
    if (category && q.category !== category) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    return true;
  });
}

// when starting:
let workingQuestions = getFilteredQuestions(
  selectedCategory,
  selectedDifficulty
);
// use workingQuestions wherever you previously used questions (or copy into questions)
```

---

## File placement & usage

- This file is `CUSTOMIZATIONS.md` in the project root. Copy the snippets into your `index.html`, `style.css`, and `script.js` as indicated. Many snippets show only the delta: merge them carefully with existing function names to avoid duplication.

## Safety / edge cases

- Validate JSON loaded from external sources prior to use.
- When using timers, always clear intervals on navigation to avoid multiple timers running.
- When using `localStorage`, guard against storage quotas and provide a fallback if unavailable.

---

If you want, I can:

- Add a minimal working implementation of the start-screen + timer directly into the project files now and wire it up, or
- Implement high scores UI and persistent storage.

Tell me which single feature to implement first and I'll add the code and verify it runs.

---

## Work log: Local hero + next steps

Status: STEP 1 (local hero) implemented in the repository — awaiting your approval.

What I changed for step 1 (safe local-first setup):

- `index.html`: swapped the hotlinked Pexels image for `assets/hero.jpg` (local path). Added a `<noscript>` fallback that references the original Pexels CDN so the page remains visual if the local file isn't present.
- `assets/HERO-README.txt`: new file added with instructions to download the Pexels photo and save it as `assets/hero.jpg` (or a webp optimized copy). This avoids committing large binary assets here and lets you control licensing.

Why this approach:

- I can't fetch or commit the external image on your behalf in this environment without explicit permission to make network calls; creating the `assets/` placeholder and wiring the path keeps the code ready for a local copy.

Next steps (pending your approval):

1. Smooth-scroll CTA (task 2) — enable `scroll-behavior: smooth;` and ensure the hero CTA jumps to `#features`. I will apply a small CSS rule and verify anchors work.
2. Active-nav highlighting (task 3) — add a small `nav.js` that adds an `.active` class to the current page's nav link and include it on `index.html`, `quiz.html`, and `flashcards.html`.
3. Timer/practice exam enhancements (task 8 in notes) — add optional per-question timer and a start screen, if you want me to implement it now.
4. Dark mode (task 10) — add CSS variable toggles and a small toggle button persisted to `localStorage`.

Please review the local-hero setup and the planned next step (smooth-scroll). Reply `approve` to continue with step 3 (active-nav highlighting), or `modify` + your notes to change the plan.

---

## Work log: Smooth-scroll CTA (step 2)

Status: STEP 2 implemented and wired into pages — awaiting your approval to proceed to step 3 (active-nav highlighting).

What I changed for step 2:

Verification notes:

Next steps (please respond with one):

1. `approve` — I'll implement step 3 (active-nav highlighting) next.
2. `modify` — request any changes to the smooth-scroll behavior (e.g., different offset, no history.replaceState, or only enable on index page).

Note: per your instruction, active-nav highlighting/styling was intentionally skipped. The tidy nav handler (`nav.js`) remains in place for smooth scrolling and offset behavior but will not add visual `.active` styles unless you ask me to enable them later. 3. `pause` — stop here; I'll wait for your instruction.

---

## Work log: Domains JSON + generator

Status: Template and generator added.

Files added/changed:

- `data/domains.json` — template file with keys `domain1`..`domain7`. Populate each domain array with questions in the same format used by `script.js`.
- `generator.js` — client-side generator that can assemble randomized quizzes from the domains JSON. Exposes `generateQuiz`, `generateAndStart` on `window` for console or UI usage.
- `script.js` — added `setActiveQuestions(arr)` and attached it to `window` so the generator can replace the runtime question pool safely.

Quick usage:

- Populate `data/domains.json` with your domain-specific questions.
- In the browser console on `quiz.html` run an example:

  generateAndStart({ totalCount: 120, selectedDomains: ['domain1','domain2'] });

  or

  generateAndStart({ perDomainCounts: { domain1: 30, domain2: 40, domain3: 50 } });

Notes:

- If you want a UI, I can add a small control panel on `quiz.html` with domain checkboxes, total question input (100–150) and a "Generate" button that calls `generateAndStart`.
- For large quiz sizes ensure domains contain enough items; generator won't duplicate items from a domain (it picks without replacement).
