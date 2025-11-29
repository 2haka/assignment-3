const state = {
  name: localStorage.getItem('visitorName') || '',
  filter: 'all',
  sort: 'newest',
  timerSeconds: 0,
  theme: localStorage.getItem('theme') || 'light'
};

const projects = [
  { title: 'Responsive Portfolio', category: 'web', date: '2024-10-01', summary: 'Refined single-page portfolio with semantic HTML and CSS grid.' },
  { title: 'Weather Scout', category: 'mobile', date: '2024-07-15', summary: 'Hybrid app mockup consuming a weather API with caching.' },
  { title: 'Data Dashboard', category: 'data', date: '2025-01-12', summary: 'Lightweight dashboard with cards, charts, and filters.' },
  { title: 'API Playground', category: 'web', date: '2024-12-02', summary: 'Reusable fetch helpers, error handling, and loading states.' }
];

const projectGrid = document.getElementById('projectGrid');
const projectStatus = document.getElementById('projectStatus');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const sortSelect = document.getElementById('sortSelect');
const repoGrid = document.getElementById('repoGrid');
const repoStatus = document.getElementById('repoStatus');
const githubUserInput = document.getElementById('githubUser');
const loadReposBtn = document.getElementById('loadRepos');
const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveName');
const greetingText = document.getElementById('greetingText');
const sessionTimer = document.getElementById('sessionTimer');
const contactForm = document.getElementById('contactForm');
const contactHelper = document.getElementById('contactHelper');
const themeToggle = document.getElementById('themeToggle');

function renderGreeting() {
  if (!state.name) {
    greetingText.textContent = 'No name saved yet.';
  } else {
    greetingText.textContent = `Welcome back, ${state.name}!`;
  }
  nameInput.value = state.name;
}

function saveName() {
  const value = nameInput.value.trim();
  if (!value) {
    greetingText.textContent = 'Please enter a name before saving.';
    return;
  }
  state.name = value;
  localStorage.setItem('visitorName', state.name);
  renderGreeting();
}

function renderProjects() {
  let filtered = projects.filter(p => state.filter === 'all' || p.category === state.filter);
  if (state.sort === 'newest') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (state.sort === 'oldest') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (state.sort === 'az') filtered.sort((a, b) => a.title.localeCompare(b.title));

  projectGrid.innerHTML = '';
  if (!filtered.length) {
    projectStatus.textContent = 'No projects match that filter.';
    return;
  }
  projectStatus.textContent = `${filtered.length} project(s) shown`;
  filtered.forEach(p => {
    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.innerHTML = `
      <span class="pill">${p.category}</span>
      <h3>${p.title}</h3>
      <p class="muted">${p.summary}</p>
      <p class="muted">Date: ${p.date}</p>
    `;
    projectGrid.appendChild(tile);
  });
}

function setFilter(filter) {
  state.filter = filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderProjects();
}

function setSort(sort) {
  state.sort = sort;
  renderProjects();
}

async function fetchRepos(username) {
  repoStatus.textContent = 'Loading repositories...';
  repoGrid.innerHTML = '';
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error(`GitHub error: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) {
      repoStatus.textContent = 'No repositories found.';
      return;
    }
    repoStatus.textContent = '';
    data.forEach(repo => {
      const tile = document.createElement('article');
      tile.className = 'tile';
      tile.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="muted">${repo.description || 'No description provided.'}</p>
        <p class="muted">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a>
      `;
      repoGrid.appendChild(tile);
    });
  } catch (err) {
    repoStatus.textContent = 'Could not load repositories. Check the username or try again later.';
    console.error(err);
  }
}

function startTimer() {
  setInterval(() => {
    state.timerSeconds += 1;
    sessionTimer.textContent = `${state.timerSeconds}s`;
  }, 1000);
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
  themeToggle.textContent = state.theme === 'light' ? 'Switch to dark' : 'Switch to light';
  localStorage.setItem('theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme();
}

function validateEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();

  const issues = [];
  if (!name) issues.push('Name is required.');
  if (!validateEmail(email)) issues.push('Email must be valid.');
  if (message.length < 10) issues.push('Message should be at least 10 characters.');

  if (issues.length) {
    contactHelper.textContent = issues.join(' ');
    contactHelper.style.color = '#d9534f';
    return;
  }

  contactHelper.textContent = 'Message validated! (No backend configured.)';
  contactHelper.style.color = 'green';
  contactForm.reset();
}

function bootstrap() {
  applyTheme();
  renderGreeting();
  renderProjects();
  startTimer();
  fetchRepos(githubUserInput.value);

  filterButtons.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
  sortSelect.addEventListener('change', () => setSort(sortSelect.value));
  loadReposBtn.addEventListener('click', () => fetchRepos(githubUserInput.value.trim() || 'octocat'));
  saveNameBtn.addEventListener('click', saveName);
  nameInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') saveName();
  });
  contactForm.addEventListener('submit', handleContactSubmit);
  themeToggle.addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', bootstrap);
