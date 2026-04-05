import { metadata } from './data/content.js';
import { icons } from './components/icons.js';
import {
  renderAbstract,
  renderIntroduction,
  renderLiterature,
  renderGaps,
  renderProblemStatement,
  renderAimObjectives,
} from './components/sections.js';

const NAV = [
  { id: 'abstract',   label: 'Abstract',           num: '00', render: renderAbstract,         icon: icons.abstract },
  { id: 'intro',      label: 'Introduction',        num: '01', render: renderIntroduction,     icon: icons.intro },
  { id: 'literature', label: 'Literature Review',   num: '02', render: renderLiterature,       icon: icons.lit },
  { id: 'gaps',       label: 'Research Gaps',       num: '03', render: renderGaps,             icon: icons.gap },
  { id: 'problem',    label: 'Problem Statement',   num: '04', render: renderProblemStatement, icon: icons.problem },
  { id: 'aim',        label: 'Aim & Objectives',    num: '05', render: renderAimObjectives,    icon: icons.aim },
];

let currentSection = NAV[0].id;

function buildShell() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <!-- SIDEBAR -->
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="phase-tag">${metadata.phase}</div>
        <h1>${metadata.title}</h1>
        <p>${metadata.focus}</p>
      </div>

      <div class="sidebar-nav">
        <div class="nav-section-label">Sections</div>
        ${NAV.map(item => `
          <a class="nav-item ${item.id === currentSection ? 'active' : ''}"
             data-section="${item.id}"
             href="#${item.id}">
            <span class="nav-num">${item.num}</span>
            <span class="nav-label">${item.label}</span>
          </a>
        `).join('')}
      </div>

      <div class="sidebar-footer">
        ${metadata.topic}
      </div>
    </nav>

    <!-- MAIN -->
    <main class="main">
      <div class="topbar">
        <div class="topbar-breadcrumb">
          Phase I
          <span>/</span>
          <span id="breadcrumb-label">${NAV[0].label}</span>
        </div>
        <div class="topbar-progress">
          <span id="progress-text">1 / ${NAV.length}</span>
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill" style="width: ${(1/NAV.length)*100}%"></div>
          </div>
        </div>
      </div>

      <div class="content">
        ${NAV.map(item => `
          <section class="section ${item.id === currentSection ? 'active' : ''}" id="section-${item.id}">
            ${item.render()}
          </section>
        `).join('')}
      </div>
    </main>
  `;
}

function navigateTo(sectionId) {
  const idx = NAV.findIndex(n => n.id === sectionId);
  if (idx === -1) return;

  // Update state
  currentSection = sectionId;

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === sectionId);
  });

  // Update sections
  document.querySelectorAll('.section').forEach(el => {
    el.classList.toggle('active', el.id === `section-${sectionId}`);
  });

  // Update topbar
  document.getElementById('breadcrumb-label').textContent = NAV[idx].label;
  document.getElementById('progress-text').textContent = `${idx + 1} / ${NAV.length}`;
  document.getElementById('progress-fill').style.width = `${((idx + 1) / NAV.length) * 100}%`;

  // Scroll to top
  document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL hash without scrolling
  history.replaceState(null, '', `#${sectionId}`);
}

// ─── Event Delegation ─────────────────────────────────────────────
function bindEvents() {
  // Sidebar nav clicks
  document.getElementById('sidebar').addEventListener('click', e => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    e.preventDefault();
    navigateTo(item.dataset.section);
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    const idx = NAV.findIndex(n => n.id === currentSection);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      if (idx < NAV.length - 1) navigateTo(NAV[idx + 1].id);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      if (idx > 0) navigateTo(NAV[idx - 1].id);
    }
  });
}

function handleInitialHash() {
  const hash = location.hash.replace('#', '');
  const found = NAV.find(n => n.id === hash);
  if (found) navigateTo(found.id);
}

buildShell();
bindEvents();
handleInitialHash();