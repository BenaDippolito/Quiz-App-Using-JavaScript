## GRC Launchpad — Quiz & Flashcards (client-side)

This is a small, client-side learning tool focused on Governance, Risk & Compliance (GRC). It's designed for quick practice sessions (quizzes) and fast review (flashcards) for learners and early-career professionals.

What it does

- Short, multiple-choice quizzes with immediate correct/incorrect feedback and a final score.
- Flashcards mode that shows a random selection of Q/A pairs you can flip through.
- Lightweight, dependency-free: plain HTML, CSS and JavaScript (no build step).

Key pages/files

- `index.html` — Landing page / entry point. Modern hero, navigation, and links to quizzes and flashcards.
- `quiz.html` — Quiz UI: renders the question, answer buttons, and Next / Play Again flow.
- `flashcards.html` — Flashcards UI with flip behavior and simple controls (Prev / Next / Flip).
- `style.css` — All styles (landing layout, quiz button states, flashcards, responsive rules).
- `script.js` — App logic: questions data, quiz flow, flashcards behavior and DOM interactions.

Notable UI details

- Correct/incorrect feedback: selected answers receive `.correct` (green) or `.incorrect` (red) and all choices are disabled until the user advances.
- Navigation: top navigation links connect Home, Quizzes and Flashcards.
- Fonts: Google Fonts (`Inter`/`Poppins`) are used in the pages for a modern, readable look.
- Hero image: the landing hero currently uses a Pexels photo (Eren Li). Attribution is shown on the page. If you want a local copy, download and place it in `assets/` and update `index.html` accordingly.

Questions data
The quiz questions live in `script.js` as an array named `questions`. Each question object has this shape:

{
question: "Question text",
answers: [
{ text: "Answer text", correct: true|false },
...
]
}

To edit or add questions: open `script.js` and modify the `questions` array. Keep the `correct` property as a boolean.

Flashcards behavior

- `flashcards.html` picks a random sample (configurable) of the questions array and shows front (question) / back (correct answer) pairs.
- Use the Prev/Next controls or click the card to flip it.

How to run locally

- Open `index.html` directly in a browser, or serve the project folder with a simple static server for better parity with web hosting:

PowerShell (from project folder):

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Accessibility & contrast

- Buttons and answer states use clear color coding and disabled states. If you need higher contrast, tweak the variables in `style.css` (`--accent`, `--muted`, etc.).

Image licensing / attribution

- Hero photo used on the landing page: "Photo by Eren Li" from Pexels (https://www.pexels.com/photo/ethnic-freelancer-in-headphones-typing-on-laptop-at-home-7241616/). Pexels photos are generally free to use commercially without attribution, but check the specific image page for model/property release details if you plan to use the photo commercially.

Next steps & ideas

- Save the hero image locally under `assets/` and update `index.html` to reference it for offline use.
- Add question categories and a simple progress tracker (localStorage) to persist scores.
- Add unit/visual tests or a tiny script to validate question data format.

If you'd like, I can:

- Save the Pexels photo into an `assets/` folder in the repo and wire `index.html` to use it.
- Add smooth-scroll behavior for the CTA that jumps to the features section.

Thanks — open the files mentioned above to edit content or request specific UI/copy changes.
