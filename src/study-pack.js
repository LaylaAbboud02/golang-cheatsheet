window.cheatSheetStudyPack = {
  getItem(element) {
    return {
      title: element.dataset.studyTitle || element.querySelector('.card-title, h2')?.textContent.trim(),
      type: element.dataset.studyType || 'Go Note',
      tags: (element.dataset.studyTags || '')
        .split(',')
        .map(tag => tag.trim().toLowerCase().replace(/\s+/g, '-'))
        .filter(Boolean),
      content: this.htmlToMarkdown(element),
    };
  },

  buildMarkdown(items) {
    const created = new Date().toISOString().slice(0, 10);
    const sections = [...items.values()].map(item => {
      const tagLine = ['go', ...item.tags].map(tag => `#${tag}`).join(' ');

      return `## ${this.escapeMarkdown(item.title)}\n\n> Source: ${item.type}\n> Tags: ${tagLine}\n\n${item.content}`;
    });

    return `# Go Study Pack\n\nCreated: ${created}\nTags: #go #study-pack\n\n${sections.join('\n\n---\n\n')}\n`;
  },

  download(items) {
    if (items.size === 0) return;

    const blob = new Blob([this.buildMarkdown(items)], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'go-study-pack.md';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },

  escapeMarkdown(text) {
    return text.replace(/#/g, '\\#');
  },

  htmlToMarkdown(element) {
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
  },
};
