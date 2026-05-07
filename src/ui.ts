import { COLORS } from './colors';
import { Checker } from './checker';

export function renderLanding(root: HTMLElement, onStart: () => void): void {
  root.innerHTML = '';

  const landing = document.createElement('div');
  landing.className = 'landing';

  const swatches = document.createElement('div');
  swatches.className = 'swatches';
  COLORS.forEach((color, i) => {
    const dot = document.createElement('span');
    dot.className = 'swatch';
    dot.style.background = color.hex;
    dot.style.setProperty('--i', String(i));
    swatches.appendChild(dot);
  });

  const title = document.createElement('h1');
  title.className = 'landing__title';
  title.textContent = 'Dead Pixel Check';

  const subtitle = document.createElement('p');
  subtitle.className = 'landing__subtitle';
  subtitle.textContent = 'Cycle through 9 test colors to spot dead, stuck, or broken subpixels.';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'landing__btn';
  btn.textContent = 'Start Check';
  btn.addEventListener('click', onStart);

  const hints = document.createElement('p');
  hints.className = 'landing__hints';
  hints.innerHTML =
    '<kbd>Click</kbd> or <kbd>Space</kbd> &mdash; next &nbsp;·&nbsp; ' +
    '<kbd>←</kbd> &mdash; back &nbsp;·&nbsp; ' +
    '<kbd>Esc</kbd> &mdash; exit';

  landing.append(swatches, title, subtitle, btn, hints);
  root.appendChild(landing);
}

export function renderChecker(onExit: () => void): Checker {
  const checker = new Checker(onExit);
  checker.start();
  return checker;
}
