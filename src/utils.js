window.cheatSheetUtils = {
  slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  },

  formatLevel(level) {
    return level.charAt(0).toUpperCase() + level.slice(1);
  },

  async copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  },

  setTemporaryButtonState(button, text, className = 'copied') {
    const originalText = button.textContent;
    button.textContent = text;
    button.classList.add(className);

    window.setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove(className);
    }, 1200);
  },
};
