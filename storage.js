const STORAGE_KEY = 'mathverse-progress';
const AUTH_KEY = 'mathverse-user';

function getProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        completedChapters: [],
        testsTaken: [],
        practiceScores: [],
        practiceAverage: 0,
        streak: 0,
        userName: 'Student'
      };
    }
    return JSON.parse(saved);
  } catch (error) {
    return {
      completedChapters: [],
      testsTaken: [],
      practiceScores: [],
      practiceAverage: 0,
      streak: 0,
      userName: 'Student'
    };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getAuth() {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : { name: 'Student', loggedIn: false };
  } catch (error) {
    return { name: 'Student', loggedIn: false };
  }
}

function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

function updateUserName(name) {
  const progress = getProgress();
  progress.userName = name;
  saveProgress(progress);
}
