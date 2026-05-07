import './styles.css';
import { renderLanding, renderChecker } from './ui';
const root = document.getElementById('app');
function showLanding() {
    renderLanding(root, showChecker);
}
function showChecker() {
    renderChecker(root, showLanding);
}
showLanding();
