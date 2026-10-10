import { useMemo, useState } from "react";

import {
  practiceQuestions,
  type PracticeCategory,
  type PracticeQuestion,
} from "../data/practiceQuestions";

type AnswerMap = Record<string, number>;

interface PracticeRecord {
  id: string;
  completedAt: string;
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

const HISTORY_KEY = "cyberlm-practice-history";

const categories: Array<"All categories" | PracticeCategory> = [
  "All categories",
  "Web Security",
  "Networking",
  "Authentication",
  "Defensive Security",
];

function readHistory(): PracticeRecord[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as PracticeRecord[]) : [];
  } catch {
    return [];
  }
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function PracticePage() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All categories");

  const [questionCount, setQuestionCount] = useState<5 | 8>(5);
  const [session, setSession] = useState<PracticeQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<PracticeRecord[]>(readHistory);

  const availableQuestions = useMemo(
    () =>
      category === "All categories"
        ? practiceQuestions
        : practiceQuestions.filter((item) => item.category === category),
    [category],
  );

  const currentQuestion = session?.[currentIndex];

  const correctCount = session
    ? session.reduce(
        (total, question) =>
          total +
          (answers[question.id] === question.correctAnswer ? 1 : 0),
        0,
      )
    : 0;

  const percentage = session?.length
    ? Math.round((correctCount / session.length) * 100)
    : 0;

  function startPractice() {
    const selected = shuffle(availableQuestions).slice(
      0,
      Math.min(questionCount, availableQuestions.length),
    );

    setSession(selected);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
  }

  function chooseAnswer(index: number) {
    if (!currentQuestion || submitted) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: index,
    }));
  }

  function finishPractice() {
    if (!session || submitted) {
      return;
    }

    const correct = session.reduce(
      (total, question) =>
        total +
        (answers[question.id] === question.correctAnswer ? 1 : 0),
      0,
    );

    const record: PracticeRecord = {
      id: `${Date.now()}`,
      completedAt: new Date().toISOString(),
      category,
      total: session.length,
      correct,
      percentage: Math.round((correct / session.length) * 100),
    };

    const nextHistory = [record, ...history].slice(0, 20);

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    } catch (error) {
      console.error("Could not save CyberLM practice history.", error);
    }

    setHistory(nextHistory);
    setSubmitted(true);
  }

  function resetPractice() {
    setSession(null);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
  }

  function clearHistory() {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error("Could not clear CyberLM practice history.", error);
    }

    setHistory([]);
  }

  return (
    <main className="practice-page">
      <header className="practice-header">
        <div className="practice-eyebrow">
          <span className="practice-status-dot" />
          CYBERLM / TRAINING LAB
        </div>

        <h1>
          Practice <span>your skills.</span>
        </h1>

        <p>
          Test your security knowledge, review the reasoning, and build
          confidence one question at a time.
        </p>
      </header>

      {!session ? (
        <>
          <section
            className="practice-setup"
            aria-labelledby="practice-setup-title"
          >
            <div>
              <p className="practice-section-label">SESSION CONFIGURATION</p>
              <h2 id="practice-setup-title">Choose your drill</h2>
              <p className="practice-muted">
                Questions come from the local practice bank. Completed sessions
                are saved in this browser.
              </p>
            </div>

            <label className="practice-field">
              <span>Topic</span>
              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as (typeof categories)[number],
                  )
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="practice-field">
              <span>Questions</span>
              <select
                value={questionCount}
                onChange={(event) =>
                  setQuestionCount(Number(event.target.value) as 5 | 8)
                }
              >
                <option value={5}>5 questions</option>
                <option value={8}>8 questions</option>
              </select>
            </label>

            <div className="practice-setup-footer">
              <span>
                {availableQuestions.length} questions available in this topic
              </span>

              <button
                className="practice-primary-button"
                onClick={startPractice}
                disabled={availableQuestions.length === 0}
              >
                Start practice <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>

          <section
            className="practice-stats-grid"
            aria-label="Practice statistics"
          >
            <article className="practice-stat-card">
              <span className="practice-stat-label">SESSIONS COMPLETED</span>
              <strong>{history.length}</strong>
              <span>Saved on this device</span>
            </article>

            <article className="practice-stat-card">
              <span className="practice-stat-label">QUESTIONS ANSWERED</span>
              <strong>
                {history.reduce((sum, item) => sum + item.total, 0)}
              </strong>
              <span>Across saved sessions</span>
            </article>

            <article className="practice-stat-card">
              <span className="practice-stat-label">AVERAGE ACCURACY</span>
              <strong>
                {history.length
                  ? `${Math.round(
                      history.reduce(
                        (sum, item) => sum + item.percentage,
                        0,
                      ) / history.length,
                    )}%`
                  : "—"}
              </strong>
              <span>
                {history.length
                  ? "Across completed sessions"
                  : "Complete a session to begin"}
              </span>
            </article>
          </section>

          <section className="practice-history">
            <div className="practice-history-heading">
              <div>
                <p className="practice-section-label">YOUR ACTIVITY</p>
                <h2>Recent sessions</h2>
              </div>

              {history.length > 0 && (
                <button
                  className="practice-text-button"
                  onClick={clearHistory}
                >
                  Clear history
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="practice-empty-state">
                <span aria-hidden="true">◷</span>
                <div>
                  <strong>No sessions yet</strong>
                  <p>Your completed practice sessions will appear here.</p>
                </div>
              </div>
            ) : (
              history.slice(0, 5).map((item) => (
                <article className="practice-history-row" key={item.id}>
                  <div>
                    <strong>{item.category}</strong>
                    <span>
                      {new Date(item.completedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="practice-history-score">
                    <strong>
                      {item.correct}/{item.total}
                    </strong>
                    <span>{item.percentage}%</span>
                  </div>
                </article>
              ))
            )}
          </section>
        </>
      ) : submitted ? (
        <section className="practice-result-panel" aria-live="polite">
          <p className="practice-section-label">SESSION COMPLETE</p>

          <div className="practice-score-circle">
            <strong>{percentage}%</strong>
            <span>accuracy</span>
          </div>

          <h2>
            {percentage >= 80
              ? "Strong work."
              : percentage >= 50
                ? "Good progress."
                : "Keep building."}
          </h2>

          <p>
            You answered <strong>{correctCount} out of {session.length}</strong>{" "}
            questions correctly. Review the explanations below to reinforce
            the concepts.
          </p>

          <div className="practice-review-list">
            {session.map((question, index) => {
              const isCorrect =
                answers[question.id] === question.correctAnswer;

              return (
                <article
                  className="practice-review-card"
                  key={question.id}
                >
                  <div className="practice-review-title">
                    <span
                      className={
                        isCorrect
                          ? "practice-answer-mark is-correct"
                          : "practice-answer-mark is-wrong"
                      }
                    >
                      {isCorrect ? "✓" : "×"}
                    </span>

                    <div>
                      <span>
                        QUESTION {index + 1} · {question.category}
                      </span>
                      <h3>{question.question}</h3>
                    </div>
                  </div>

                  <p>
                    <strong>Your answer:</strong>{" "}
                    {answers[question.id] === undefined
                      ? "Not answered"
                      : question.options[answers[question.id]]}
                  </p>

                  <p>
                    <strong>Correct answer:</strong>{" "}
                    {question.options[question.correctAnswer]}
                  </p>

                  <p>{question.explanation}</p>

                  <div className="practice-takeaway">
                    <strong>KEY TAKEAWAY</strong>
                    <span>{question.takeaway}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="practice-result-actions">
            <button
              className="practice-secondary-button"
              onClick={resetPractice}
            >
              Back to practice
            </button>

            <button
              className="practice-primary-button"
              onClick={startPractice}
            >
              Try another session <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      ) : currentQuestion ? (
        <section
          className="practice-quiz-panel"
          aria-labelledby="practice-question-title"
        >
          <div className="practice-quiz-topline">
            <button
              className="practice-text-button"
              onClick={resetPractice}
            >
              ← Exit session
            </button>

            <span>
              QUESTION {currentIndex + 1} OF {session.length}
            </span>
          </div>

          <div className="practice-progress-track">
            <span
              style={{
                width: `${((currentIndex + 1) / session.length) * 100}%`,
              }}
            />
          </div>

          <div className="practice-question-meta">
            <span>{currentQuestion.category}</span>
            <span>{currentQuestion.difficulty}</span>
          </div>

          {currentQuestion.scenario && (
            <div className="practice-scenario">
              <span>SCENARIO</span>
              <p>{currentQuestion.scenario}</p>
            </div>
          )}

          <h2 id="practice-question-title">
            {currentQuestion.question}
          </h2>

          <div className="practice-options" role="group" aria-label="Answer options">
            {currentQuestion.options.map((option, index) => {
              const selected = answers[currentQuestion.id] === index;

              return (
                <button
                  key={option}
                  type="button"
                  className={`practice-option${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="practice-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  <span
                    className="practice-option-radio"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="practice-quiz-footer">
            <span>
              {Object.keys(answers).length} of {session.length} answered
            </span>

            {currentIndex < session.length - 1 ? (
              <button
                className="practice-primary-button"
                onClick={() => setCurrentIndex((value) => value + 1)}
              >
                {answers[currentQuestion.id] === undefined
                  ? "Skip question"
                  : "Next question"}{" "}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                className="practice-primary-button"
                onClick={finishPractice}
              >
                Finish session <span aria-hidden="true">→</span>
              </button>
            )}
          </div>

          {currentIndex === session.length - 1 && (
            <button
              className="practice-text-button practice-finish-link"
              onClick={finishPractice}
            >
              Finish and view results
            </button>
          )}
        </section>
      ) : null}
    </main>
  );
}