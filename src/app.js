function initApp() {
  const sections = window.cheatSheetSections;
  const notes = window.cheatSheetNotes;
  const playgroundExamples = window.cheatSheetPlaygroundExamples;
  const sectionLevels = window.cheatSheetSectionLevels;
  const { copyText, formatLevel, setTemporaryButtonState, slugify } = window.cheatSheetUtils;

  const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('go-cheatsheet-theme');
const initialTheme = storedTheme || 'light';

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('go-cheatsheet-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Day mode' : 'Night mode';
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

setTheme(initialTheme);
themeToggle.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

const nav = document.getElementById('nav');
const sectionsEl = document.getElementById('sections');
const notesView = document.getElementById('notes-view');
const toolbar = document.querySelector('.toolbar');
const searchInput = document.getElementById('topic-search');
const searchClear = document.getElementById('search-clear');
const emptyState = document.getElementById('empty-state');
const resultStatus = document.getElementById('result-status');
const viewTabs = [...document.querySelectorAll('[data-view]')];
const levelButtons = [...document.querySelectorAll('[data-level-filter]')];
const navButtons = [];
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
  const viewLabels = {
    fieldNotes: 'Field Notes',
    idioms: 'Idioms',
    gotchas: 'Gotchas',
  };
  const intros = {
    fieldNotes: 'Cleaned-up learning notes from the journey: mental models, web app flow, and practical reminders that do not belong in a terse cheat sheet.',
    idioms: 'Style and convention notes that make Go code feel more natural in reviews and real projects.',
    gotchas: 'Small traps and behavior notes that are easy to forget while learning Go.',
  };
  const cards = notes[viewName] || [];

  notesView.innerHTML = `
    <p class="notes-intro">${intros[viewName]}</p>
    <div class="notes-grid">
      ${cards.map(card => `
        <article class="note-card">
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
addSnippetActions();
bindFilterControls();
bindViewTabs();
openCardFromHash();
  window.addEventListener('hashchange', openCardFromHash);
}
