import { COLORS } from './colors';

export class Checker {
  private index = 0;
  private overlay!: HTMLDivElement;
  private hud!: HTMLDivElement;
  private finishing = false;
  private readonly onExit: () => void;

  constructor(onExit: () => void) {
    this.onExit = onExit;
  }

  start(): void {
    this.index = 0;
    this.finishing = false;

    this.overlay = document.createElement('div');
    this.overlay.className = 'color-overlay';
    // Set initial color BEFORE adding to DOM — no flash.
    this.overlay.style.backgroundColor = COLORS[0].hex;

    const exitBtn = document.createElement('button');
    exitBtn.type = 'button';
    exitBtn.className = 'exit-btn';
    exitBtn.setAttribute('aria-label', 'Exit');
    exitBtn.textContent = '✕';
    exitBtn.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      this.finish();
    });

    this.hud = document.createElement('div');
    this.hud.className = 'hud';

    this.overlay.append(exitBtn, this.hud);
    document.body.appendChild(this.overlay);
    this.updateHud();

    // pointerdown fires BEFORE click. The original "Start" button click
    // produced its pointerdown sequence on the button, which has already
    // ended by the time we attach this listener. So this listener will
    // only ever fire on NEW pointer events from inside the overlay.
    this.overlay.addEventListener('pointerdown', this.handleAdvance);
    window.addEventListener('keydown', this.handleKey);
  }

  private updateHud(): void {
    const c = COLORS[this.index];
    this.hud.textContent = `${c.name}   ${this.index + 1} / ${COLORS.length}`;
  }

  private handleAdvance = (e: Event): void => {
    e.stopPropagation();
    this.next();
  };

  private handleKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { this.finish(); return; }
    // Ignore key-repeat from a held key (e.g. holding Enter on Start button).
    if (e.repeat) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { this.prev(); return; }
    e.preventDefault();
    this.next();
  };

  next(): void {
    this.index++;
    if (this.index >= COLORS.length) { this.finish(); return; }
    this.overlay.style.backgroundColor = COLORS[this.index].hex;
    this.updateHud();
  }

  prev(): void {
    if (this.index > 0) {
      this.index--;
      this.overlay.style.backgroundColor = COLORS[this.index].hex;
      this.updateHud();
    }
  }

  finish(): void {
    if (this.finishing) return;
    this.finishing = true;

    this.overlay.removeEventListener('pointerdown', this.handleAdvance);
    window.removeEventListener('keydown', this.handleKey);
    this.overlay.remove();
    this.onExit();
  }
}
