import { Checker } from './checker';
export function renderLanding(root, onStart) {
    root.innerHTML = '';
    const landing = document.createElement('div');
    landing.className = 'landing';
    const title = document.createElement('h1');
    title.className = 'landing__title';
    title.textContent = 'Dead Pixel Check';
    const subtitle = document.createElement('p');
    subtitle.className = 'landing__subtitle';
    subtitle.textContent = 'Inspect your display for dead, stuck, or defective pixels.';
    const btn = document.createElement('button');
    btn.className = 'landing__btn';
    btn.textContent = 'Start Pixel Check';
    btn.addEventListener('click', onStart);
    const hints = document.createElement('p');
    hints.className = 'landing__hints';
    hints.innerHTML =
        '<kbd>Space</kbd> or <kbd>Click</kbd> — next color &nbsp;·&nbsp; ' +
            '<kbd>←</kbd> — previous &nbsp;·&nbsp; ' +
            '<kbd>Esc</kbd> — exit';
    landing.append(title, subtitle, btn, hints);
    root.appendChild(landing);
}
export function renderChecker(root, onExit) {
    root.innerHTML = '';
    const exitBtn = document.createElement('button');
    exitBtn.className = 'exit-btn';
    exitBtn.setAttribute('aria-label', 'Exit pixel check');
    exitBtn.textContent = '✕';
    exitBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        checker.finish();
    });
    root.appendChild(exitBtn);
    const checker = new Checker(onExit);
    checker.start(root);
    return checker;
}
