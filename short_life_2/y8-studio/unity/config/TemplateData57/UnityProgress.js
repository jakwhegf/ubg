const rootPath = 'y8-studio/unity/config/TemplateData57';

function UnityProgress(gameInstance, progress) {
  if (!gameInstance || !gameInstance.Module) {
    return;
  }

  /* Hoàn tất: xử lý trước — tránh 100 * "complete" => NaN và DOM lặp */
  if (progress === 'complete') {
    if (gameInstance.logo) gameInstance.logo.style.display = 'none';
    if (gameInstance.progress) gameInstance.progress.style.display = 'none';
    if (gameInstance.textProgress) gameInstance.textProgress.style.display = 'none';
    try {
      document.dispatchEvent(new Event('removeSoundOverlay'));
    } catch (e) {}
    return;
  }

  if (typeof progress !== 'number' || isNaN(progress)) {
    return;
  }
  progress = Math.max(0, Math.min(1, progress));

  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement('div');
    gameInstance.logo.className = 'logo ' + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }

  if (!gameInstance.progress) {
    gameInstance.progress = document.createElement('div');
    gameInstance.progress.className = 'progress ' + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement('div');
    gameInstance.progress.empty.className = 'empty';
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement('div');
    gameInstance.progress.full.className = 'full';
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
    gameInstance.textProgress = document.createElement('div');
    gameInstance.textProgress.className = 'text';
    gameInstance.container.appendChild(gameInstance.textProgress);
  }

  gameInstance.progress.full.style.width = (100 * progress) + '%';
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + '%';
  gameInstance.textProgress.textContent = 'Loading: ' + Math.floor(progress * 100) + '%';

  if (progress >= 1) {
    gameInstance.textProgress.innerHTML = 'Running... <img src="' + rootPath + '/gears.gif" class="spinner" />';
  }
}
