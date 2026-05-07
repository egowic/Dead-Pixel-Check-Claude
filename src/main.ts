import './styles.css';
import { renderLanding, renderChecker } from './ui';

const root = document.getElementById('app')!;

function showLanding(): void {
  renderLanding(root, showChecker);
}

function showChecker(): void {
  renderChecker(root, showLanding);
}

showLanding();
