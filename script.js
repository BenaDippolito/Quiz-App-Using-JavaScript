// Quiz questions data: an array of question objects.
// Each question has a 'question' string and an 'answers' array of { text, correct } objects.
const questions = [
  {
    question:
      "Which risk assessment approach PRIMARILY relies on numerical data and mathematical models to evaluate risk?",
    answers: [
      { text: "Qualitative", correct: false },
      { text: "Quantitative", correct: true },
      { text: "Semiquantitative", correct: false },
      { text: "Descriptive", correct: false },
    ],
  },
  {
    question:
      "What approach focuses first on identifying critical assets and potential impacts?",
    answers: [
      { text: "Quantitative approach", correct: false },
      { text: "Threat-oriented approach", correct: false },
      { text: "Vulnerability-oriented approach", correct: false },
      { text: "Asset/impact-oriented approach", correct: true },
    ],
  },
  {
    question:
      "What type of risk assessment approach uses descriptive analysis rather than numerical data?",
    answers: [
      { text: "Qualitative approach", correct: true },
      { text: "Quantitative approach", correct: false },
      { text: "Threat-oriented approach", correct: false },
      { text: "Semiquantitative approach", correct: false },
    ],
  },
  {
    question:
      "Which risk assessment approach provides the MOST objective basis for decision-making?",
    answers: [
      { text: "Qualitative", correct: false },
      { text: "Quantitative", correct: true },
      { text: "Semiquantitative", correct: false },
      { text: "Threat-oriented assessment", correct: false },
    ],
  },
  {
    question:
      "According to NIST SP 800-39, which tier of risk management addresses risk from an organizational perspective?",
    answers: [
      { text: "Tier One", correct: true },
      { text: "Tier Two", correct: false },
      { text: "Tier Three", correct: false },
      { text: "Tier Four", correct: false },
    ],
  },
  {
    question:
      "According to NIST SP 800-39, what does Tier Two risk management focus on?",
    answers: [
      { text: "Risk tolerance", correct: false },
      { text: "Information systems", correct: false },
      { text: "Organizational governance", correct: false },
      { text: "Mission and business processes", correct: true },
    ],
  },
  {
    question:
      "What are the limitations on strategic investments in risk management?",
    answers: [
      { text: "Constraints, tolerances, priorities", correct: false },
      { text: "Strategies, architectures, systems", correct: false },
      {
        text: "Eliminating all risk, unlimited resources, static endeavor",
        correct: false,
      },
      {
        text: "Mission priorities, anticipated risk response needs, investment limitations",
        correct: true,
      },
    ],
  },
  {
    question:
      "According to NIST SP 800-39, what is the focus of Tier Three in the risk management framework?",
    answers: [
      {
        text: "Classifying information and systems, assessing risk, and defining responses",
        correct: true,
      },
      { text: "Managing mission and business processes", correct: false },
      {
        text: "Addressing risks from an organizational perspective",
        correct: false,
      },
      {
        text: "Implementing enterprise architecture and governance",
        correct: false,
      },
    ],
  },
  {
    question:
      "What framework provides some of the most comprehensive role definitions?",
    answers: [
      { text: "ISO 27001", correct: false },
      { text: "NIST RMF", correct: false },
      { text: "COBIT", correct: true },
      { text: "CIS Controls", correct: false },
    ],
  },
  {
    question:
      "What are the three main categories of roles defined in GRC frameworks?",
    answers: [
      { text: "Organizational, managerial, and operational", correct: false },
      {
        text: "Organizational/management, security/privacy program, and system/technical",
        correct: true,
      },
      { text: "Executive, middle management, and staff", correct: false },
      { text: "Policy, process, and technical", correct: false },
    ],
  },
  {
    question:
      "Which of the following is an example of a security/privacy program role defined in a GRC framework?",
    answers: [
      { text: "Chief Information Officer (CIO)", correct: false },
      { text: "Data Privacy Officer (DPO)", correct: true },
      { text: "IT Systems Administrator", correct: false },
      { text: "Risk Management Analyst", correct: false },
    ],
  },
  {
    question:
      "Which of the following is an example of an organizational/management role defined in a GRC framework?",
    answers: [
      { text: "Chief Executive Officer (CEO)", correct: true },
      { text: "Security Architect", correct: false },
      { text: "IT Support Specialist", correct: false },
      { text: "Network Engineer", correct: false },
    ],
  },
  {
    question:
      "What are the four main components of organization-wide risk management?",
    answers: [
      {
        text: "Risk framing, risk assessment, risk response, and risk monitoring",
        correct: true,
      },
      {
        text: "Risk identification, risk analysis, risk evaluation, and risk treatment",
        correct: false,
      },
      {
        text: "Hazard identification, risk analysis, risk prioritization, and risk mitigation",
        correct: false,
      },
      {
        text: "Threat detection, vulnerability assessment, impact analysis, and control implementation",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which risk response involves changing behavior or functionality so that the risk conditions no longer exist?",
    answers: [
      { text: "Risk acceptance", correct: false },
      { text: "Risk mitigation", correct: false },
      { text: "Risk avoidance", correct: true },
      { text: "Risk transfer", correct: false },
    ],
  },
  {
    question: "Which of the following is an example of risk mitigation?",
    answers: [
      { text: "Transferring the risk to an insurance company", correct: false },
      { text: "Ignoring the risk due to its low impact", correct: false },
      {
        text: "Installing security patches to fix vulnerabilities in a system",
        correct: true,
      },
      { text: "Avoiding activities that introduce the risk", correct: false },
    ],
  },
  {
    question: "Which of the following is an example of risk acceptance?",
    answers: [
      {
        text: "Changing business operations to eliminate the risk entirely",
        correct: false,
      },
      {
        text: "Purchasing insurance to cover potential financial loss from a risk",
        correct: false,
      },
      {
        text: "Implementing additional security measures to reduce vulnerabilities",
        correct: false,
      },
      {
        text: "Taking no action because the risk is low impact",
        correct: true,
      },
    ],
  },
  {
    question: "What is the first step in the risk management process?",
    answers: [
      { text: "Risk assessment", correct: false },
      { text: "Risk monitoring", correct: false },
      { text: "Risk identification", correct: true },
      { text: "Risk treatment", correct: false },
    ],
  },
  {
    question:
      'What does "risk tolerance" refer to in the context of risk management?',
    answers: [
      {
        text: "The process of reducing risk likelihood or impact",
        correct: false,
      },
      {
        text: "The level of risk an organization is willing to accept",
        correct: true,
      },
      {
        text: "The process of continuously tracking identified risks",
        correct: false,
      },
      {
        text: "The methodology used to assess risk likelihood and impact",
        correct: false,
      },
    ],
  },
  {
    question: "What aspect of risk tolerance is challenging to define?",
    answers: [
      { text: "Acceptability", correct: true },
      { text: "Measurement", correct: false },
      { text: "Documentation", correct: false },
      { text: "Subjectivity", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the PRIMARY benefit of applying consistency and objectivity in risk assessments?",
    answers: [
      {
        text: "Ensures that risk assessments are subjective and based on individual judgment",
        correct: false,
      },
      {
        text: "Allows for unreliable comparison and aggregation of risk data",
        correct: false,
      },
      {
        text: "Helps produce results that are difficult to use in decision-making",
        correct: false,
      },
      {
        text: "Enables standardized, reliable risk comparison and aggregation across the organization",
        correct: true,
      },
    ],
  },
  {
    question:
      "What aspect of risk management are risk assessments part of, according to NIST guidance?",
    answers: [
      { text: "Organization-wide process", correct: true },
      { text: "System development life cycle", correct: false },
      { text: "Information sharing", correct: false },
      { text: "Defining risk models", correct: false },
    ],
  },
  {
    question:
      "According to NIST, which approach is recommended for conducting risk assessments?",
    answers: [
      { text: "A quantitative approach", correct: false },
      { text: "A threat-based approach", correct: true },
      { text: "An impact-based approach", correct: false },
      { text: "A vulnerability-based approach", correct: false },
    ],
  },
  {
    question:
      "What is the MAIN NIST reference for conducting risk assessments?",
    answers: [
      { text: "NIST SP 800-30", correct: true },
      { text: "NIST SP 800-37", correct: false },
      { text: "NIST SP 800-39", correct: false },
      { text: "NIST SP 800-53", correct: false },
    ],
  },
  {
    question:
      "What does NIST guidance say about sharing risk assessment information?",
    answers: [
      { text: "Should only be shared with senior management", correct: false },
      { text: "Should not be shared outside the organization", correct: false },
      {
        text: "Provides the best value to share within an organization",
        correct: true,
      },
      {
        text: "Can only be shared after mitigations are implemented",
        correct: false,
      },
    ],
  },
  {
    question:
      "What is the KEY difference between COBIT and NIST/ISO frameworks?",
    answers: [
      { text: "COBIT has fewer controls than NIST/ISO", correct: false },
      {
        text: "COBIT only applies to IT while NIST/ISO apply more broadly",
        correct: false,
      },
      {
        text: "COBIT provides more detailed guidance on aligning GRC with business needs",
        correct: true,
      },
      {
        text: "COBIT focuses more on technical controls while NIST/ISO focus more on business alignment",
        correct: false,
      },
    ],
  },
  {
    question: "What does the COBIT framework provide guidance on?",
    answers: [
      { text: "Optimizing use of IT resources", correct: true },
      { text: "Ensuring compliance with regulations", correct: false },
      { text: "Implementing technical security controls", correct: false },
      {
        text: "Understanding what elements of a GRC program are needed",
        correct: false,
      },
    ],
  },
  {
    question: "What is the MAIN focus of the COBIT framework?",
    answers: [
      { text: "Managing risks", correct: false },
      { text: "Optimizing IT resources", correct: false },
      { text: "Implementing security controls", correct: false },
      { text: "Ensuring IT supports business strategy", correct: true },
    ],
  },
  {
    question:
      "What is COBIT's approach to risk management implementation compared to NIST and ISO?",
    answers: [
      {
        text: "It's less detailed on implementation mechanisms.",
        correct: true,
      },
      {
        text: "It's more detailed on implementation mechanisms.",
        correct: false,
      },
      {
        text: "It's equally detailed on implementation mechanisms.",
        correct: false,
      },
      {
        text: "COBIT does not discuss implementation mechanisms.",
        correct: false,
      },
    ],
  },
  {
    question:
      "What does governance at the top level of an organization establish?",
    answers: [
      { text: "Detailed procedures for every department", correct: false },
      { text: "Guidance for hiring and retaining staff", correct: false },
      { text: "Organizational goals and objectives", correct: true },
      { text: "A centralized decision-making body", correct: false },
    ],
  },
  {
    question: "What is one way organizations distribute governance output?",
    answers: [
      { text: "Through creation of policies", correct: true },
      { text: "By delegating all decisions", correct: false },
      { text: "With a decentralized approach", correct: false },
      { text: "Using only informal communication", correct: false },
    ],
  },
];

// DOM references: elements the script reads/writes to update the UI.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");

// Quiz state variables: track current question index and user score.
let currentQuestionIndex = 0;
let score = 0;

// Timer defaults and runtime state
const DEFAULT_TIME_PER_QUESTION = 15; // seconds
let timerId = null;
let timeLeft = DEFAULT_TIME_PER_QUESTION;

// Exam-level countdown (3 hours) and runtime state
const EXAM_TOTAL_SECONDS = 3 * 60 * 60; // 3 hours in seconds
let examTimerId = null;
let examTimeLeft = EXAM_TOTAL_SECONDS;
let examStartTime = null; // timestamp when exam started
let examTimedOut = false;

// runtime list: use built-in questions only
let activeQuestions = [...questions];

// Allow external code (generator) to replace the active question list.
function setActiveQuestions(arr) {
  if (!Array.isArray(arr)) return;
  activeQuestions = arr.slice();
}
window.setActiveQuestions = setActiveQuestions;

/*
  startQuiz()
  - Initialize quiz state (index and score).
  - Reset the Next button text.
  - Show the first question.
*/
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  // start the overall exam countdown and then show the first question
  startExamTimer();
  showQuestion();
}

/*
  showQuestion()
  - Clears previous answers via resetState().
  - Renders the current question text.
  - Creates answer buttons for each possible answer.
  - Attaches click handlers to answer buttons.
*/
function showQuestion() {
  resetState();
  let currentQuestion = activeQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    // store correctness on dataset so it can be read in event handlers
    button.dataset.correct = answer.correct;
    answerButtons.appendChild(button);
    // attach click handler to evaluate selection
    button.addEventListener("click", selectAnswer);
  });

  // Note: per-question timeout behavior has been disabled in favor of an
  // overall exam countdown (3 hours). Individual question timing can be
  // reintroduced if desired by calling startTimer(DEFAULT_TIME_PER_QUESTION).
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function startExamTimer(initialSeconds) {
  stopExamTimer();
  examTimedOut = false;
  // allow passing remaining seconds when resuming
  examTimeLeft =
    typeof initialSeconds === "number" && initialSeconds >= 0
      ? initialSeconds
      : EXAM_TOTAL_SECONDS;
  // set examStartTime so elapsed calculation works (startTime offset by elapsed)
  examStartTime = Date.now() - (EXAM_TOTAL_SECONDS - examTimeLeft) * 1000;
  if (!timerElement) return;
  timerElement.textContent = `Time left: ${formatTime(examTimeLeft)}`;
  examTimerId = setInterval(() => {
    examTimeLeft -= 1;
    if (timerElement)
      timerElement.textContent = `Time left: ${formatTime(examTimeLeft)}`;
    if (examTimeLeft <= 0) {
      stopExamTimer();
      examTimedOut = true;
      // end the quiz when time runs out
      showScore();
    }
  }, 1000);
}

function stopExamTimer() {
  if (examTimerId) {
    clearInterval(examTimerId);
    examTimerId = null;
  }
}

function startTimer(seconds) {
  stopTimer();
  if (!timerElement) return;
  timeLeft = seconds;
  timerElement.textContent = `Time: ${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft -= 1;
    if (timerElement) timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      stopTimer();
      // handle timeout: reveal correct answers and show Next
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function handleTimeout() {
  // reveal correct answer(s) and disable buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  if (nextButton) nextButton.style.display = "block";
}

/*
  resetState()
  - Hides the next button until an answer is chosen.
  - Removes any previous answer buttons so new ones can be rendered.
*/
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/*
  selectAnswer(e)
  - Handles a user's answer selection.
  - Marks the selected button as correct/incorrect visually.
  - Reveals the correct answer and disables all buttons to prevent further clicks.
  - Shows the Next button to proceed.
*/
function selectAnswer(e) {
  // stop the timer immediately when a selection is made
  stopTimer();

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // reveal correct answer(s) and disable all choices
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/*
  Next button event listener
  - If Next button currently shows "Play Again", restart the quiz.
  - Otherwise, advance to the next question.
*/
if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
      startQuiz();
    } else {
      // ensure timer is cleared before advancing
      stopTimer();
      handleNextButton();
    }
  });
}

/*
  showScore()
  - Clears the UI and displays the final score.
  - Changes Next button to "Play Again" so user can restart.
*/
function showScore() {
  // stop any running timer and clear UI
  stopTimer();
  stopExamTimer();
  resetState();
  // compute elapsed time
  let elapsedMs = 0;
  if (examStartTime) {
    elapsedMs = Date.now() - examStartTime;
    if (examTimedOut) elapsedMs = EXAM_TOTAL_SECONDS * 1000;
  }
  const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const elapsedStr = formatTime(elapsedSeconds);

  questionElement.innerHTML =
    `You scored ${score} out of ${activeQuestions.length}!` +
    `<div style="margin-top:8px;font-weight:600;">Time taken: ${elapsedStr}</div>`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  // Update quiz tracker UI (if present)
  try {
    const statusEl = document.getElementById("trackerStatus");
    const scoreEl = document.getElementById("trackerScore");
    const scoreVal = document.getElementById("trackerScoreVal");
    const timeEl = document.getElementById("trackerTime");
    const timeVal = document.getElementById("trackerTimeVal");
    const whenEl = document.getElementById("trackerWhen");
    const whenVal = document.getElementById("trackerWhenVal");
    if (statusEl)
      statusEl.textContent = examTimedOut
        ? "Quiz ended: time expired"
        : "Quiz finished";
    if (scoreEl && scoreVal) {
      scoreEl.style.display = "";
      scoreVal.textContent = `${score} / ${activeQuestions.length}`;
    }
    if (timeEl && timeVal) {
      timeEl.style.display = "";
      timeVal.textContent = elapsedStr;
    }
    if (whenEl && whenVal) {
      whenEl.style.display = "";
      whenVal.textContent = new Date().toLocaleString();
    }
    // per-domain breakdown
    const breakdownEl = document.getElementById("trackerDomainBreakdown");
    const listEl = document.getElementById("trackerDomainList");
    if (listEl) {
      listEl.innerHTML = "";
      const counts = {};
      (activeQuestions || []).forEach((q) => {
        const d = q && q.__domain ? q.__domain : "unknown";
        counts[d] = (counts[d] || 0) + 1;
      });
      for (const [d, c] of Object.entries(counts)) {
        const li = document.createElement("li");
        li.textContent = `${d}: ${c}`;
        listEl.appendChild(li);
      }
      if (breakdownEl)
        breakdownEl.style.display = Object.keys(counts).length ? "" : "none";
    }
    // update progress (final)
    const prog = document.getElementById("trackerProgress");
    const progVal = document.getElementById("trackerProgressVal");
    if (prog && progVal) {
      prog.style.display = "";
      progVal.textContent = `${activeQuestions.length} / ${activeQuestions.length}`;
    }
    // show resume button only if quiz incomplete saved – hide now since finished
    const resumeBtn = document.getElementById("resumeBtn");
    if (resumeBtn) resumeBtn.style.display = "none";
  } catch (e) {}

  // persist last quiz to localStorage
  try {
    const last = {
      finished: true,
      score,
      total: activeQuestions.length,
      elapsedSeconds: elapsedSeconds,
      timestamp: Date.now(),
      activeQuestions: activeQuestions,
      currentQuestionIndex: currentQuestionIndex,
    };
    localStorage.setItem("lastQuiz", JSON.stringify(last));
  } catch (e) {}
}

// Called by external code (e.g. modal close) to mark the last quiz as incomplete
function markQuizIncomplete() {
  try {
    const statusEl = document.getElementById("trackerStatus");
    const scoreEl = document.getElementById("trackerScore");
    const scoreVal = document.getElementById("trackerScoreVal");
    const timeEl = document.getElementById("trackerTime");
    const timeVal = document.getElementById("trackerTimeVal");
    const whenEl = document.getElementById("trackerWhen");
    const whenVal = document.getElementById("trackerWhenVal");
    if (statusEl) statusEl.textContent = "Quiz incomplete (closed by user)";
    if (scoreEl && scoreVal) {
      scoreEl.style.display = "";
      scoreVal.textContent = `${score} / ${activeQuestions.length}`;
    }
    if (timeEl && timeVal) {
      timeEl.style.display = "";
      timeVal.textContent = formatTime(
        Math.max(
          0,
          Math.floor((Date.now() - (examStartTime || Date.now())) / 1000)
        )
      );
    }
    if (whenEl && whenVal) {
      whenEl.style.display = "";
      whenVal.textContent = new Date().toLocaleString();
    }
  } catch (e) {}
  // persist incomplete quiz to localStorage so user can resume later
  try {
    let elapsedMs = 0;
    if (examStartTime) elapsedMs = Date.now() - examStartTime;
    const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
    const last = {
      finished: false,
      score,
      total: activeQuestions.length,
      elapsedSeconds,
      timestamp: Date.now(),
      activeQuestions: activeQuestions,
      currentQuestionIndex: currentQuestionIndex,
      examTimeLeft: typeof examTimeLeft === "number" ? examTimeLeft : null,
    };
    localStorage.setItem("lastQuiz", JSON.stringify(last));
  } catch (e) {}

  // show resume button
  try {
    const resumeBtn = document.getElementById("resumeBtn");
    if (resumeBtn) resumeBtn.style.display = "";
  } catch (e) {}
}
window.markQuizIncomplete = markQuizIncomplete;

/*
  handleNextButton()
  - Advances currentQuestionIndex and shows the next question,
    or calls showScore() when there are no more questions.
*/
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Initialize the quiz when the script loads only if the quiz DOM exists on this page.
if (questionElement && answerButtons && nextButton) {
  startQuiz();
}

// Export small helpers so other scripts can control timers if needed
window.stopExamTimer = stopExamTimer;
window.stopTimer = stopTimer;

// On load: hydrate tracker from last saved quiz (if any) and wire Resume button
(function hydrateTrackerFromStorage() {
  try {
    const raw = localStorage.getItem("lastQuiz");
    if (!raw) return;
    const last = JSON.parse(raw);
    const statusEl = document.getElementById("trackerStatus");
    const scoreVal = document.getElementById("trackerScoreVal");
    const timeVal = document.getElementById("trackerTimeVal");
    const whenVal = document.getElementById("trackerWhenVal");
    const listEl = document.getElementById("trackerDomainList");
    const resumeBtn = document.getElementById("resumeBtn");

    if (statusEl)
      statusEl.textContent = last.finished
        ? "Last quiz finished"
        : "Last quiz incomplete";
    if (scoreVal)
      scoreVal.textContent =
        last.score +
        " / " +
        (last.total || (last.activeQuestions || []).length);
    if (timeVal) timeVal.textContent = formatTime(last.elapsedSeconds || 0);
    if (whenVal)
      whenVal.textContent = last.timestamp
        ? new Date(last.timestamp).toLocaleString()
        : "";
    if (listEl && Array.isArray(last.activeQuestions)) {
      listEl.innerHTML = "";
      const counts = {};
      last.activeQuestions.forEach((q) => {
        const d = q && q.__domain ? q.__domain : "unknown";
        counts[d] = (counts[d] || 0) + 1;
      });
      for (const [d, c] of Object.entries(counts)) {
        const li = document.createElement("li");
        li.textContent = `${d}: ${c}`;
        listEl.appendChild(li);
      }
    }

    if (resumeBtn) {
      resumeBtn.style.display = last.finished ? "none" : "";
      resumeBtn.addEventListener("click", async () => {
        try {
          // restore activeQuestions and indexes
          if (
            Array.isArray(last.activeQuestions) &&
            last.activeQuestions.length
          ) {
            setActiveQuestions(last.activeQuestions);
            currentQuestionIndex =
              typeof last.currentQuestionIndex === "number"
                ? last.currentQuestionIndex
                : 0;
            score = typeof last.score === "number" ? last.score : 0;
            // compute remaining exam seconds
            let remaining = null;
            if (typeof last.examTimeLeft === "number")
              remaining = last.examTimeLeft;
            else
              remaining = Math.max(
                0,
                EXAM_TOTAL_SECONDS - (last.elapsedSeconds || 0)
              );

            // move quiz section into modal and open it
            const quizSection = document.getElementById("quiz-section");
            const modal = document.getElementById("quizModal");
            if (quizSection && modal) {
              const body = modal.querySelector(".modal-body");
              if (body && quizSection.parentNode !== body)
                body.appendChild(quizSection);
              modal.classList.add("open");
              // bind close handlers similar to generator
              const closeBtn = modal.querySelector(".modal-close");
              const overlay = modal.querySelector(".modal-overlay");
              function closeModal() {
                try {
                  if (typeof window.markQuizIncomplete === "function")
                    window.markQuizIncomplete();
                } catch (e) {}
                try {
                  if (typeof window.stopExamTimer === "function")
                    window.stopExamTimer();
                } catch (e) {}
                try {
                  if (typeof window.stopTimer === "function")
                    window.stopTimer();
                } catch (e) {}
                modal.classList.remove("open");
                const main = document.querySelector("main.container");
                if (main) main.appendChild(quizSection);
                else document.body.appendChild(quizSection);
              }
              if (!modal.dataset.bound) {
                if (closeBtn) closeBtn.addEventListener("click", closeModal);
                if (overlay) overlay.addEventListener("click", closeModal);
                modal.dataset.bound = "1";
              }
            }

            // start exam timer with remaining seconds and show the restored question
            startExamTimer(remaining);
            // render current question (don't reset score/current index)
            showQuestion();
          }
        } catch (e) {
          console.warn("Resume error", e);
        }
      });
    }
  } catch (e) {
    console.warn("hydrate tracker failed", e);
  }
})();
