document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const status = document.getElementById('copy-status');
    try {
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(value);
      } catch (_) {
        const field = document.createElement('textarea');
        field.value = value;
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        button.focus();
        if (!copied) throw new Error('Copy failed');
      }
      button.textContent = '已复制';
      status.textContent = button.getAttribute('aria-label').replace('复制', '') + '已复制';
      clearTimeout(button.copyTimer);
      button.copyTimer = setTimeout(() => {button.textContent = '复制';}, 2000);
    } catch (_) {
      status.textContent = '复制未成功，请选中旁边的联系方式手动复制。';
    }
  });
});
