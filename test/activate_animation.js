const animation = document.querySelector('p.animation');
const applyAnimation = document.querySelector('.animation-example>button.activate');
let iterationCount = 0;

applyAnimation.addEventListener('click', () => {
  animation.classList.toggle('active');
  animationEventLog.textContent = '';
  iterationCount = 0;
});