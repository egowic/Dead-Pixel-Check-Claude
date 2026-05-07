import { COLORS } from './colors';

type DocWebkit = Document & {
  webkitFullscreenElement: Element | null;
  webkitExitFullscreen?: () => void;
};
type ElWebkit = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

export class Checker {
  private index = 0;
  private overlay!: HTMLDivElement;
  private hud!: HTMLDivElement;
  private finishing = false;
  // Set to true only after fullscreen is confirmed entered.
  // Prevents finish() firing when Safari rejects the request
  // and fires fullscreenchange with fullscreenElement === null.
  private enteredFullscreen = false;
  private readonly onExit: () => void;

  constructor(onExit: () => void) {
    this.onExit = onExit;
  }

  start(): void {
    this.index = 0;
    this.finishing = false;
    this.enteredFullscreen = false;

    this.overlay = document.createElement('div');
    this.overlay.className = 'color-overlay';
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

    this.overlay.addEventListener('pointerdown', this.handleAdvance);
    window.addEventListener('keydown', this.handleKey);
    document.addEventListener('fullscreenchange', this.handleFsChange);
    document.addEventListener('webkitfullscreenchange', this.handleFsChange);

    this.requestFs();
  }

  private updateHud(): void {
    const c = COLORS[this.index];
    this.hud.textContent = `${c.name}   ${this.index + 1} / ${COLORS.length}`;
  }

  private handleFsChange = (): void => {
    const doc = document as DocWebkit;
    const active = document.fullscreenElement ?? doc.webkitFullscreenElement;
    if (active) {
      this.enteredFullscreen = true;
    } else if (this.enteredFullscreen) {
      // User exited fullscreen externally (e.g. Escape in Safari).
      this.finish();
    }
    // If !active && !enteredFullscreen: request was rejected — stay in
    // overlay mode covering the viewport, just without OS-level fullscreen.
  };

  private handleAdvance = (e: Event): void => {
    e.stopPropagation();
    this.next();
  };

  private handleKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { this.finish(); return; }
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
    document.removeEventListener('fullscreenchange', this.handleFsChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFsChange);

    this.overlay.remove();
    this.exitFs();
    this.onExit();
  }

  private requestFs(): void {
    const el = this.overlay as ElWebkit;
    const p = el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.();
    p?.catch(() => undefined);
  }

  private exitFs(): void {
    const doc = document as DocWebkit;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else if (doc.webkitFullscreenElement) {
      doc.webkitExitFullscreen?.();
    }
  }
}
