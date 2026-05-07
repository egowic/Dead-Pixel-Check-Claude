import { COLORS } from './colors';
export class Checker {
    index = 0;
    hudTimer = null;
    hud = null;
    onExit;
    constructor(onExit) {
        this.onExit = onExit;
    }
    start(root) {
        this.index = 0;
        this.hud = this.buildHud(root);
        this.paint();
        this.enterFullscreen(root);
        window.addEventListener('keydown', this.handleKey);
        window.addEventListener('click', this.handleAdvance);
        window.addEventListener('touchstart', this.handleAdvance, { passive: true });
    }
    buildHud(root) {
        const hud = document.createElement('div');
        hud.className = 'hud';
        root.appendChild(hud);
        return hud;
    }
    paint() {
        const color = COLORS[this.index];
        document.body.style.backgroundColor = color.hex;
        document.body.classList.add('checking');
        if (this.hud) {
            this.hud.textContent = `${color.name} — ${this.index + 1} / ${COLORS.length}`;
            this.hud.classList.remove('hud--hidden');
        }
        if (this.hudTimer !== null)
            clearTimeout(this.hudTimer);
        this.hudTimer = setTimeout(() => {
            this.hud?.classList.add('hud--hidden');
        }, 1500);
    }
    handleKey = (e) => {
        if (e.key === 'Escape') {
            this.finish();
            return;
        }
        if (e.key === 'ArrowLeft') {
            this.prev();
            return;
        }
        e.preventDefault();
        this.next();
    };
    handleAdvance = () => {
        this.next();
    };
    next() {
        this.index++;
        if (this.index >= COLORS.length) {
            this.finish();
            return;
        }
        this.paint();
    }
    prev() {
        if (this.index > 0) {
            this.index--;
            this.paint();
        }
    }
    finish() {
        if (this.hudTimer !== null) {
            clearTimeout(this.hudTimer);
            this.hudTimer = null;
        }
        window.removeEventListener('keydown', this.handleKey);
        window.removeEventListener('click', this.handleAdvance);
        window.removeEventListener('touchstart', this.handleAdvance);
        document.body.style.backgroundColor = '';
        document.body.classList.remove('checking');
        this.exitFullscreen();
        this.onExit();
    }
    enterFullscreen(el) {
        el.requestFullscreen?.().catch(() => {
            // Fullscreen rejected (e.g. desktop policy) — continue without it
        });
    }
    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => undefined);
        }
    }
}
