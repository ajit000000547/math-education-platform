const appState = {
  currentSession: null,
  currentQuestionIndex: 0,
  modal: null
};

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function ensureModal() {
  if (document.getElementById('app-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'app-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="modal-title">Session</h3>
        <button class="modal-close" aria-label="Close">×</button>
      </div>
      <div id="modal-body" class="modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.modal-close').addEventListener('click', () => closeModal());
  modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal());

  appState.modal = modal;
}

function openModal(title, htmlContent) {
  ensureModal();
  const titleNode = document.getElementById('modal-title');
  const bodyNode = document.getElementById('modal-body');
  titleNode.textContent = title;
  bodyNode.innerHTML = htmlContent;
  appState.modal.classList.add('open');
}

function closeModal() {
  if (!appState.modal) return;
  appState.modal.classList.remove('open');
  appState.currentSession = null;
  appState.currentQuestionIndex = 0;
}

function bindDataLinks() {
  document.querySelectorAll('[data-link]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.link;
      if (target) window.location.href = target;
    });
  });
}

function bindAuthButtons() {
  document.querySelectorAll('[data-auth="login"]').forEach((button) => {
    button.addEventListener('click', () => openLoginModal());
  });
}

function openLoginModal() {
  const auth = getAuth();
  openModal('Login to MathVerse Pro', `
    <form id="login-form" class="auth-form">
      <label>Student Name</label>
      <input type="text" id="student-name" value="${auth.name || 'Student'}" placeholder="Enter your name" required />
      <button type="submit" class="btn btn-primary">Continue</button>
    </form>
  `);

  const form = document.getElementById('login-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('student-name').value.trim() || 'Student';
    const authState = { name, loggedIn: true };
    saveAuth(authState);
    updateUserName(name);
    renderDashboard();
    closeModal();
    showToast(`Welcome, ${name}!`);
  });
}

function markChapterComplete(chapterId) {
  const progress = getProgress();
  if (!progress.completedChapters.includes(chapterId)) {
    progress.completedChapters.push(chapterId);
    if (!progress.streak || progress.streak < 1) progress.streak = 1;
    saveProgress(progress);
    showToast('Chapter marked complete');
  } else {
    showToast('This chapter is already complete');
  }
  renderChapterCards();
  renderDashboard();
}

function renderChapterCards() {
  const grid = document.getElementById('chapter-grid');
  if (!grid) return;

  const progress = getProgress();
  grid.innerHTML = mathEducationData.chapters.map((chapter) => {
    const completed = progress.completedChapters.includes(chapter.id);
    return `
      <article class="chapter-card ${chapter.level}">
        <div class="chapter-number">${chapter.number}</div>
        <h3>${chapter.title}</h3>
        <p>${chapter.description}</p>
        <button class="btn ${completed ? 'btn-light' : 'btn-primary'} small" data-chapter-id="${chapter.id}">
          ${completed ? 'Completed' : 'Open'}
        </button>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-chapter-id]').forEach((button) => {
    button.addEventListener('click', () => markChapterComplete(Number(button.dataset.chapterId)));
  });
}

function renderPracticeCards() {
  const grid = document.getElementById('practice-grid');
  if (!grid) return;

  grid.innerHTML = mathEducationData.practiceSets.map((set) => `
    <div class="practice-card large-card">
      <h3>${set.title}</h3>
      <p>${set.description}</p>
      <ul>
        ${set.questions.map((question, index) => `<li>${index + 1}. ${question.question}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" data-practice-id="${set.id}">Start Session</button>
    </div>
  `).join('');

  grid.querySelectorAll('[data-practice-id]').forEach((button) => {
    button.addEventListener('click', () => startQuizSession(button.dataset.practiceId, 'practice'));
  });
}

function renderTests() {
  const grid = document.getElementById('test-grid');
  if (!grid) return;

  grid.innerHTML = mathEducationData.tests.map((test) => `
    <div class="quiz-item">
      <span class="test-badge">${test.title}</span>
      <h3>${test.title}</h3>
      <p>${test.questions.length} Questions | ${test.duration} Minutes</p>
      <button class="btn btn-light small" data-test-id="${test.id}">Take Test</button>
    </div>
  `).join('');

  grid.querySelectorAll('[data-test-id]').forEach((button) => {
    button.addEventListener('click', () => startQuizSession(button.dataset.testId, 'test'));
  });
}

function renderNotes() {
  const grid = document.getElementById('notes-grid');
  if (!grid) return;

  grid.innerHTML = mathEducationData.notes.map((note) => `
    <article class="note-card">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    </article>
  `).join('');
}

function renderFormulas() {
  const grid = document.getElementById('formula-grid');
  if (!grid) return;

  const categories = Object.entries(mathEducationData.formulas);
  grid.innerHTML = categories.map(([category, items]) => `
    <div class="formula-panel">
      <h3>${category}</h3>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderDashboard() {
  const auth = getAuth();
  const progress = getProgress();
  const userTitle = document.getElementById('dashboard-user');
  if (userTitle) {
    userTitle.textContent = `${auth.name || progress.userName || 'Student'}'s learning progress`;
  }

  const statsBox = document.getElementById('dashboard-stats');
  if (!statsBox) return;

  const completed = progress.completedChapters.length;
  const total = mathEducationData.chapters.length;
  const averagePractice = Math.round(progress.practiceAverage || 0);
  const totalTests = progress.testsTaken.length;

  statsBox.innerHTML = `
    <div class="stat-card accent">
      <span>Completed Chapters</span>
      <strong>${completed}/${total}</strong>
      <small>Good progress this week</small>
    </div>
    <div class="stat-card blue">
      <span>Practice Score</span>
      <strong>${averagePractice}%</strong>
      <small>Steady improvement</small>
    </div>
    <div class="stat-card pink">
      <span>Mock Tests</span>
      <strong>${totalTests}</strong>
      <small>More tests recommended</small>
    </div>
  `;

  const progressBox = document.getElementById('dashboard-progress');
  if (progressBox) {
    progressBox.innerHTML = `
      <div class="progress-row">
        <span>Algebra</span>
        <div class="tiny-progress"><span style="width: ${Math.min(100, completed * 8)}%"></span></div>
      </div>
      <div class="progress-row">
        <span>Geometry</span>
        <div class="tiny-progress"><span style="width: ${Math.min(100, Math.max(35, completed * 7))}%"></span></div>
      </div>
      <div class="progress-row">
        <span>Calculus</span>
        <div class="tiny-progress"><span style="width: ${Math.min(100, Math.max(20, completed * 6))}%"></span></div>
      </div>
    `;
  }

  const goalsList = document.getElementById('dashboard-goals');
  if (goalsList) {
    const remaining = total - completed;
    goalsList.innerHTML = `
      <li>${remaining > 0 ? `Complete ${remaining} more chapter${remaining > 1 ? 's' : ''}` : 'All chapters complete'}</li>
      <li>${averagePractice < 80 ? 'Practice for 20 more minutes today' : 'Great job! Keep the streak going'}</li>
      <li>${totalTests >= 3 ? 'Revise weak chapters before next test' : 'Attempt 2 more mock tests this week'}</li>
    `;
  }
}

function startQuizSession(sessionId, mode) {
  const sessions = mode === 'practice' ? mathEducationData.practiceSets : mathEducationData.tests;
  const session = sessions.find((item) => item.id === sessionId);
  if (!session) return;

  appState.currentSession = {
    mode,
    session,
    currentIndex: 0,
    answers: {}
  };

  buildQuizModal();
}

function buildQuizModal() {
  const current = appState.currentSession;
  if (!current) return;

  const question = current.session.questions[current.currentIndex];
  openModal(current.session.title, `
    <div class="quiz-card">
      <div class="quiz-meta">
        <span>Question ${current.currentIndex + 1} / ${current.session.questions.length}</span>
        <span>${current.mode === 'practice' ? 'Practice' : 'Test'}</span>
      </div>
      <h4>${question.question}</h4>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button type="button" class="quiz-option ${current.answers[question.id] === String(index) ? 'selected' : ''}" data-option-index="${index}">
            ${String.fromCharCode(65 + index)}. ${option}
          </button>
        `).join('')}
      </div>
      <div class="quiz-actions">
        <button type="button" class="btn btn-light" id="prev-question" ${current.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button type="button" class="btn btn-primary" id="next-question">
          ${current.currentIndex === current.session.questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  `);

  document.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      const idx = button.dataset.optionIndex;
      current.answers[question.id] = String(idx);
      document.querySelectorAll('.quiz-option').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  document.getElementById('prev-question')?.addEventListener('click', () => {
    if (current.currentIndex > 0) {
      current.currentIndex -= 1;
      buildQuizModal();
    }
  });

  document.getElementById('next-question').addEventListener('click', () => {
    if (current.currentIndex < current.session.questions.length - 1) {
      current.currentIndex += 1;
      buildQuizModal();
      return;
    }

    submitQuiz();
  });
}

function submitQuiz() {
  const current = appState.currentSession;
  if (!current) return;

  const questions = current.session.questions;
  let correct = 0;

  questions.forEach((question) => {
    if (current.answers[question.id] === question.answer) {
      correct += 1;
    }
  });

  const score = Math.round((correct / questions.length) * 100);
  const progress = getProgress();

  if (current.mode === 'practice') {
    progress.practiceScores.push(score);
    progress.practiceAverage = Math.round(progress.practiceScores.reduce((total, value) => total + value, 0) / progress.practiceScores.length);
    saveProgress(progress);
    renderDashboard();
    showToast(`Practice score: ${score}%`);
  } else {
    progress.testsTaken.push({ id: current.session.id, score, date: new Date().toISOString() });
    saveProgress(progress);
    renderDashboard();
    showToast(`Test score: ${score}%`);
  }

  openModal(current.session.title, `
    <div class="result-card">
      <h4>Result Summary</h4>
      <p>You answered <strong>${correct}</strong> out of <strong>${questions.length}</strong> correctly.</p>
      <div class="score-ring">${score}%</div>
      <button class="btn btn-primary" id="close-result">Close</button>
    </div>
  `);

  document.getElementById('close-result')?.addEventListener('click', () => closeModal());
  closeModal();
}

function initPage() {
  bindDataLinks();
  bindAuthButtons();

  const page = document.body.dataset.page;

  if (page === 'chapters') renderChapterCards();
  if (page === 'practice') renderPracticeCards();
  if (page === 'tests') renderTests();
  if (page === 'notes') renderNotes();
  if (page === 'formulas') renderFormulas();
  if (page === 'dashboard') renderDashboard();

  const auth = getAuth();
  if (auth.loggedIn) {
    const userName = auth.name || 'Student';
    document.querySelectorAll('[data-auth="login"]').forEach((button) => {
      button.textContent = userName;
    });
  }

  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === window.location.pathname.split('/').pop() || (href === 'index.html' && window.location.pathname.endsWith('/'))) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initPage);
