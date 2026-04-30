function initApp() {
  const sections = window.cheatSheetSections;
  const notes = window.cheatSheetNotes;
  const playgroundExamples = window.cheatSheetPlaygroundExamples;
  const sectionLevels = window.cheatSheetSectionLevels;
  const { copyText, formatLevel, setTemporaryButtonState, slugify } = window.cheatSheetUtils;

  const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const storedMode = localStorage.getItem('go-cheatsheet-theme-mode') || localStorage.getItem('go-cheatsheet-theme');
const storedStyle = localStorage.getItem('go-cheatsheet-theme-style');
let activeMode = storedMode || 'light';
let activeStyle = storedStyle || 'classic';

function setTheme(style, mode) {
  activeStyle = style;
  activeMode = mode;
  document.documentElement.dataset.style = style;
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('go-cheatsheet-theme-style', style);
  localStorage.setItem('go-cheatsheet-theme-mode', mode);
  themeStyle.value = style;
  themeToggle.textContent = mode === 'dark' ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-pressed', String(mode === 'dark'));
}

setTheme(activeStyle, activeMode);
themeStyle.addEventListener('change', () => setTheme(themeStyle.value, activeMode));
themeToggle.onclick = () => setTheme(activeStyle, activeMode === 'dark' ? 'light' : 'dark');

const nav = document.getElementById('nav');
const sectionsEl = document.getElementById('sections');
const notesView = document.getElementById('notes-view');
const toolbar = document.querySelector('.toolbar');
const studyPackCount = document.getElementById('study-pack-count');
const studyPackClear = document.getElementById('study-pack-clear');
const studyPackDownload = document.getElementById('study-pack-download');
const searchInput = document.getElementById('topic-search');
const searchClear = document.getElementById('search-clear');
const emptyState = document.getElementById('empty-state');
const resultStatus = document.getElementById('result-status');
const viewTabs = [...document.querySelectorAll('[data-view]')];
const levelButtons = [...document.querySelectorAll('[data-level-filter]')];
const navButtons = [];
const studyPackItems = new Map();
let activeSectionId = sections[0].id;
let activeLevel = 'all';

function setActiveSection(sectionId) {
  activeSectionId = sectionId;
  navButtons.forEach(({ button, id }) => {
    const isActive = id === sectionId;
    button.classList.toggle('active', isActive);
    document.getElementById('sec-' + id).classList.toggle('active', isActive);
  });
}

function setActiveLevel(level) {
  activeLevel = level;
  levelButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.levelFilter === level);
  });
}

function clearFilters() {
  searchInput.value = '';
  setActiveLevel('all');
  resetFilters();
}

function renderSections() {
  sections.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (i === 0 ? ' active' : '');
    btn.textContent = s.label;
    btn.onclick = () => {
      clearFilters();
      setActiveSection(s.id);
    };
    navButtons.push({ button: btn, id: s.id, label: s.label.toLowerCase() });
    nav.appendChild(btn);

    const div = document.createElement('div');
    div.id = 'sec-' + s.id;
    div.className = 'section' + (i === 0 ? ' active' : '');
    div.innerHTML = s.content;
    div.dataset.sectionLabel = s.label.toLowerCase();
    div.dataset.level = sectionLevels[s.id] || 'intermediate';

    const resultTitle = document.createElement('div');
    resultTitle.className = 'section-result-title';
    resultTitle.textContent = s.label;
    div.prepend(resultTitle);

    div.querySelectorAll('.card').forEach(card => {
      card.dataset.level = div.dataset.level;
      card.dataset.sectionId = s.id;
      card.dataset.sectionLabel = s.label;
    });
    sectionsEl.appendChild(div);
  });
}

function renderNotesView(viewName) {
  if (viewName === 'about') {
    notesView.innerHTML = `
      <p class="notes-intro">This started as a Go cheat sheet, then grew into a small learning hub: quick reference, personal notes, runnable examples, and Markdown export for people who like to keep obsidian notes (or any kind of notes) like me.</p>
      <div class="about-list">
        <article class="about-item">
          <h2>Search, filters, and sections</h2>
          <p>Use search when you know what you want, difficulty filters when you want a learning-level view, and section chips when you want to browse by topic. Every card has a difficulty level and a section label.</p>
        </article>
        <article class="about-item">
          <h2>Copy and Run</h2>
          <p>Copy grabs the visible snippet. Run is only shown on examples that have a complete runnable version; it copies that version and opens the Go Playground (you still need to paste it yourself!).</p>
        </article>
        <article class="about-item">
          <h2>Shareable topic links</h2>
          <p>The small # beside a card title creates a direct link to that topic, so you can save or share one exact card instead of pointing someone at the whole page.</p>
        </article>
        <article class="about-item">
          <h2>Study packs</h2>
          <p>Select cards or notes, then download them as one Markdown file. The idea is to make a portable study bundle that works nicely with Obsidian, GitHub, or any note-taking app that understands Markdown.</p>
        </article>
        <article class="about-item">
          <h2>Field notes, idioms, and gotchas</h2>
          <p>The extra tabs are curated from my own learning notes.</p>
        </article>
        <article class="about-item">
          <h2>Themes</h2>
          <p>Just to make things a bit cuter :3</p>
        </article>
      </div>
    `;
    notesView.setAttribute('aria-label', 'About this Go learning hub');
    return;
  }

  const viewLabels = {
    fieldNotes: 'Field Notes',
    idioms: 'Idioms',
    gotchas: 'Gotchas',
  };
  const intros = {
    fieldNotes: 'Cleaned-up general learning notes, directly pulled from my personal Obsidian note collection.',
    idioms: 'Style and convention notes that make Go code feel more natural in reviews and real projects, also from my personal notes but focused on common patterns rather than language features.',
    gotchas: 'Again from my obsidian notes xD. Small traps and behavior notes that are easy to forget while learning Go.',
  };
  const cards = notes[viewName] || [];

  notesView.innerHTML = `
    <p class="notes-intro">${intros[viewName]}</p>
    <div class="notes-grid">
      ${cards.map(card => `
        <article class="note-card" data-study-type="${viewName}" data-study-title="${card.title}" data-study-tags="${card.tags.join(',')}">
          <h2>${card.title}</h2>
          <div class="note-tags">
            ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          ${card.body}
        </article>
      `).join('')}
    </div>
  `;
  notesView.setAttribute('aria-label', viewLabels[viewName]);
  addStudySelectors(notesView);
}

function setActiveView(viewName) {
  const isCheatSheet = viewName === 'cheatsheet';

  viewTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === viewName);
  });

  toolbar.hidden = !isCheatSheet;
  emptyState.hidden = true;
  sectionsEl.hidden = !isCheatSheet;
  notesView.hidden = isCheatSheet;

  if (isCheatSheet) {
    clearFilters();
    return;
  }

  renderNotesView(viewName);
}

function addCardMetadata() {
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.card-title');
    const titleText = title.textContent.trim();
    const sectionId = card.dataset.sectionId;
    const level = card.dataset.level;
    const cardId = `${sectionId}-${slugify(titleText)}`;
    const isRunnable = Boolean(playgroundExamples[titleText]);

    card.id = cardId;
    card.dataset.cardTitle = titleText;
    card.dataset.studyType = 'Cheat Sheet';
    card.dataset.studyTitle = titleText;
    card.dataset.studyTags = [card.dataset.sectionLabel, level, isRunnable ? 'runnable' : ''].filter(Boolean).join(',');
    card.dataset.searchText = [
      titleText,
      card.dataset.sectionLabel,
      level,
      isRunnable ? 'runnable playground run' : '',
      card.textContent,
    ].join(' ').toLowerCase();

    const link = document.createElement('a');
    link.className = 'card-link';
    link.href = '#' + cardId;
    link.setAttribute('aria-label', `Link to ${titleText}`);
    link.textContent = '#';
    title.appendChild(link);

    const tags = document.createElement('div');
    tags.className = 'card-tags';
    tags.innerHTML = [
      `<span class="tag tag-level">${formatLevel(level)}</span>`,
      `<span class="tag">${card.dataset.sectionLabel}</span>`,
      isRunnable ? '<span class="tag">Runnable</span>' : '',
    ].join('');
    title.insertAdjacentElement('afterend', tags);
  });
}

function updateStudyPackBar() {
  const count = studyPackItems.size;
  studyPackCount.textContent = String(count);
  studyPackDownload.disabled = count === 0;
}

function syncStudySelector(button, isSelected) {
  button.classList.toggle('selected', isSelected);
  button.textContent = isSelected ? 'Selected' : 'Add to study pack';
  button.setAttribute('aria-pressed', String(isSelected));
}

function addStudySelectors(root = document) {
  root.querySelectorAll('.card, .note-card').forEach(item => {
    if (item.querySelector(':scope > .study-select')) return;

    const id = item.id || `${item.dataset.studyType}-${slugify(item.dataset.studyTitle)}`;
    item.dataset.studyId = id;

    const button = document.createElement('button');
    button.className = 'study-select';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    syncStudySelector(button, studyPackItems.has(id));

    button.addEventListener('click', () => {
      if (studyPackItems.has(id)) {
        studyPackItems.delete(id);
        syncStudySelector(button, false);
      } else {
        studyPackItems.set(id, getStudyPackItem(item));
        syncStudySelector(button, true);
      }
      updateStudyPackBar();
    });

    item.prepend(button);
  });
}

function escapeMarkdown(text) {
  return text.replace(/#/g, '\\#');
}

function getStudyPackItem(item) {
  return {
    title: item.dataset.studyTitle || item.querySelector('.card-title, h2')?.textContent.trim(),
    type: item.dataset.studyType || 'Go Note',
    tags: (item.dataset.studyTags || '')
      .split(',')
      .map(tag => tag.trim().toLowerCase().replace(/\s+/g, '-'))
      .filter(Boolean),
    content: htmlToMarkdown(item),
  };
}

function htmlToMarkdown(element) {
  const clone = element.cloneNode(true);
  clone.querySelectorAll('button, .snippet-actions, .card-link').forEach(node => node.remove());
  clone.querySelectorAll('pre').forEach(pre => {
    pre.replaceWith(document.createTextNode(`\n\n\`\`\`go\n${pre.textContent.trim()}\n\`\`\`\n\n`));
  });
  clone.querySelectorAll('code').forEach(code => {
    code.replaceWith(document.createTextNode(`\`${code.textContent}\``));
  });
  clone.querySelectorAll('li').forEach(li => {
    li.prepend(document.createTextNode('- '));
    li.append(document.createTextNode('\n'));
  });
  clone.querySelectorAll('p,h2,ol,ul,div').forEach(node => {
    node.append(document.createTextNode('\n'));
  });
  return clone.textContent
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildStudyPackMarkdown() {
  const created = new Date().toISOString().slice(0, 10);
  const sections = [...studyPackItems.values()].map(item => {
    const tagLine = ['go', ...item.tags].map(tag => `#${tag}`).join(' ');

    return `## ${escapeMarkdown(item.title)}\n\n> Source: ${item.type}\n> Tags: ${tagLine}\n\n${item.content}`;
  });

  return `# Go Study Pack\n\nCreated: ${created}\nTags: #go #study-pack\n\n${sections.join('\n\n---\n\n')}\n`;
}

function downloadStudyPack() {
  if (studyPackItems.size === 0) return;

  const blob = new Blob([buildStudyPackMarkdown()], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'go-study-pack.md';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clearStudyPack() {
  studyPackItems.clear();
  document.querySelectorAll('.study-select').forEach(button => syncStudySelector(button, false));
  updateStudyPackBar();
}

function bindStudyPackControls() {
  studyPackClear.addEventListener('click', clearStudyPack);
  studyPackDownload.addEventListener('click', downloadStudyPack);
  updateStudyPackBar();
}

function resetFilters() {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('search-match');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.hidden = false;
  });
  navButtons.forEach(({ button }) => {
    button.hidden = false;
  });
  emptyState.hidden = true;
  searchClear.hidden = !searchInput.value;
  resultStatus.textContent = '';
  setActiveSection(activeSectionId);
}

function clearSearch() {
  if (!searchInput.value) return;
  searchInput.value = '';
  applyFilters();
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const hasFilters = query || activeLevel !== 'all';

  if (!hasFilters) {
    resetFilters();
    return;
  }

  let matchCount = 0;
  searchClear.hidden = !query;

  navButtons.forEach(({ button, id, label }) => {
    const section = document.getElementById('sec-' + id);
    const sectionResultTitle = section.querySelector('.section-result-title');
    let visibleCards = 0;

    button.classList.remove('active');
    section.classList.remove('active');

    section.querySelectorAll('.card').forEach(card => {
      const levelMatches = activeLevel === 'all' || card.dataset.level === activeLevel;
      const queryMatches = !query || label.includes(query) || card.dataset.searchText.includes(query);
      const isVisible = levelMatches && queryMatches;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCards += 1;
        matchCount += 1;
      }
    });

    button.hidden = visibleCards === 0;
    section.classList.toggle('search-match', visibleCards > 0);
    if (sectionResultTitle) {
      sectionResultTitle.textContent = `${button.textContent} (${visibleCards})`;
    }
  });

  emptyState.hidden = matchCount > 0;
  resultStatus.textContent = `${matchCount} matching topic${matchCount === 1 ? '' : 's'}`;
}

function bindFilterControls() {
  searchInput.addEventListener('input', applyFilters);
  searchClear.addEventListener('click', () => {
    clearSearch();
    searchInput.focus();
  });

  levelButtons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveLevel(button.dataset.levelFilter);
      applyFilters();
    });
  });
}

function bindViewTabs() {
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setActiveView(tab.dataset.view);
    });
  });
}

function openCardFromHash() {
  const cardId = window.location.hash.slice(1);
  if (!cardId) return;

  const card = document.getElementById(cardId);
  if (!card) return;

  const section = card.closest('.section');
  clearFilters();
  setActiveSection(section.id.replace('sec-', ''));
  window.setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
}

function addSnippetActions() {
  document.querySelectorAll('pre').forEach((pre) => {
    const cardTitle = pre.closest('.card')?.dataset.cardTitle;
    const runnableCode = playgroundExamples[cardTitle];
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    const actions = document.createElement('div');
    actions.className = 'snippet-actions';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.type = 'button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code snippet');
    actions.appendChild(copyButton);

    if (runnableCode) {
      const runButton = document.createElement('button');
      runButton.className = 'run-btn';
      runButton.type = 'button';
      runButton.textContent = 'Run';
      runButton.setAttribute('aria-label', 'Copy runnable example and open Go Playground');
      actions.appendChild(runButton);

      runButton.addEventListener('click', async () => {
        try {
          await copyText(runnableCode.trim());
          setTemporaryButtonState(runButton, 'Copied');
        } catch {
          setTemporaryButtonState(runButton, 'Failed');
        }

        window.open('https://go.dev/play/', '_blank', 'noopener');
      });
    }

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(actions);

    copyButton.addEventListener('click', async () => {
      try {
        await copyText(pre.textContent.trim());
        setTemporaryButtonState(copyButton, 'Copied');
      } catch {
        setTemporaryButtonState(copyButton, 'Failed');
      }
    });
  });
}

renderSections();
addCardMetadata();
addStudySelectors();
addSnippetActions();
bindFilterControls();
bindViewTabs();
bindStudyPackControls();
openCardFromHash();
  window.addEventListener('hashchange', openCardFromHash);
}
