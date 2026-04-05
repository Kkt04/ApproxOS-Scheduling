import { icons } from './icons.js';
import {
  abstract,
  introduction,
  literatureReview,
  researchGaps,
  problemStatement,
  aimAndObjectives,
} from '../data/content.js';

export function renderAbstract() {
  return `
    <div class="section-hero">
      <div class="section-tag">Abstract</div>
      <h2>Brief Summary</h2>
      <p class="hero-desc">150–250 word overview of the problem, method, and key expected findings.</p>
    </div>

    <div class="abstract-box">
      ${abstract.paragraphs.map(p => `<p>${p}</p>`).join('')}
      <div class="abstract-meta">
        ${abstract.tags.map(t => `<span class="meta-chip">${t}</span>`).join('')}
        <span class="meta-chip">${abstract.wordCount}</span>
      </div>
    </div>
  `;
}

export function renderIntroduction() {
  return `
    <div class="section-hero">
      <div class="section-tag">Section 1</div>
      <h2>Introduction</h2>
      <p class="hero-desc">Why approximate computing in OS kernels matters today — and what this paper contributes.</p>
    </div>

    <div class="intro-grid">
      ${introduction.motivations.map(m => `
        <div class="intro-card">
          <div class="card-icon">${icons[m.icon] || icons.cpu}</div>
          <h3>${m.title}</h3>
          <p>${m.body}</p>
        </div>
      `).join('')}
    </div>

    <div class="contributions-box">
      <h3>Paper Contributions</h3>
      ${introduction.contributions.map(c => `
        <div class="contribution-item">
          <div class="contrib-dot"></div>
          <p>${c}</p>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderLiterature() {
  return `
    <div class="section-hero">
      <div class="section-tag">Section 2</div>
      <h2>Literature Review</h2>
      <p class="hero-desc">Critical summary and comparison of 8 existing research papers on approximate computing and OS scheduling.</p>
    </div>

    <div class="papers-grid">
      ${literatureReview.map(p => `
        <div class="paper-card">
          <div class="paper-header">
            <span class="paper-tag">${p.tag}</span>
            <span class="paper-venue">${p.venue}</span>
          </div>
          <div class="paper-body">
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
            <div class="paper-limitation">
              <strong>Limitation:</strong> ${p.limitation}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderGaps() {
  return `
    <div class="section-hero">
      <div class="section-tag">Section 3</div>
      <h2>Research Gaps</h2>
      <p class="hero-desc">Five specific unsolved problems identified after reviewing the existing literature.</p>
    </div>

    <div class="gaps-list">
      ${researchGaps.map((g, i) => `
        <div class="gap-item">
          <div class="gap-num">G${i + 1}</div>
          <div class="gap-content">
            <h3>${g.title}</h3>
            <p>${g.body}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderProblemStatement() {
  return `
    <div class="section-hero">
      <div class="section-tag">Section 4</div>
      <h2>Problem Statement</h2>
      <p class="hero-desc">A precise, focused, falsifiable statement of the exact problem this paper will address.</p>
    </div>

    <div class="problem-statement-box">
      <p>${problemStatement.statement}</p>
    </div>

    <div class="problem-pillars">
      ${problemStatement.pillars.map(p => `
        <div class="pillar">
          <div class="pillar-icon">${p.icon}</div>
          <h4>${p.title}</h4>
          <p>${p.body}</p>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderAimObjectives() {
  return `
    <div class="section-hero">
      <div class="section-tag">Section 5</div>
      <h2>Aim & Objectives</h2>
      <p class="hero-desc">Overall aim and five specific, measurable objectives aligned to the identified research gaps.</p>
    </div>

    <div class="aim-box">
      <div class="aim-block">
        <h3>Overall Aim</h3>
        <p>${aimAndObjectives.aim}</p>
      </div>
      <div class="aim-block">
        <h3>Scope</h3>
        <p>${aimAndObjectives.scope}</p>
      </div>
    </div>

    <div class="objectives-list">
      ${aimAndObjectives.objectives.map(o => `
        <div class="objective-item">
          <span class="obj-code">${o.code}</span>
          <div class="obj-title">${o.title}</div>
          <div class="obj-body">${o.body}</div>
        </div>
      `).join('')}
    </div>
  `;
}