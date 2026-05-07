# Dead Pixel Check

A minimal, full-screen tool for inspecting displays for dead, stuck, or subpixel-defective pixels.

**Live:** https://egowic.github.io/Dead-Pixel-Check-Claude/

## Controls

| Action | Effect |
|---|---|
| `Click` / `Space` / `Tap` | Next color |
| `←` | Previous color |
| `Esc` / hover `✕` | Exit |

Colors loop continuously — exit when done.

## Color sequence

ISO 13406-2 order (9 colors, looping):

Black → White → Red → Green → Blue → Cyan → Magenta → Yellow → Gray

## Dev

```bash
npm install
npm run dev    # http://localhost:5173/Dead-Pixel-Check-Claude/
npm run build  # output → dist/
```

## Stack

Vanilla TypeScript · Vite · GitHub Pages
