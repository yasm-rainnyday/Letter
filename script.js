// Music button control
const musicBtn = document.querySelector('.music-btn');
const music = document.getElementById('letter-music');

if (music) {
  music.volume = 0.5;
}

if (musicBtn && music) {
  musicBtn.addEventListener('click', () => {
    music.play();
  });
}

const flap = document.querySelector('.letter-flap');
const content = document.querySelector('.letter-content');
const envelope = document.querySelector('.letter-envelope');

let isDragging = false;
let startY = 0;
let lastDragDistance = 0;

// ------------------ FLAP DRAG ------------------

flap.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
  flap.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dragDistance = startY - e.clientY;
  lastDragDistance = dragDistance;

  const limitedDrag = Math.max(0, Math.min(dragDistance, 80));
  flap.style.transform = `translateY(-${limitedDrag}px)`;
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  flap.style.cursor = 'grab';

 if (lastDragDistance > 60) {
  flap.style.transition = 'transform 0.3s ease';
  flap.style.transform = 'translateY(-80px)';

  // 1. Remove envelope FIRST
  envelope.style.display = 'none';

  // 2. Then reveal content
  content.style.opacity = '1';
  content.style.pointerEvents = 'auto';
  content.style.zIndex = '4';
  
  // 3. Reveal pull tab
  pullTab.style.opacity = '1';
  pullTab.style.pointerEvents = 'auto';
  
  // 4. Reveal image
  const image = document.querySelector('.letter-image');
  image.style.opacity = '1';
} else {
    // RESET
    flap.style.transition = 'transform 0.2s ease';
    flap.style.transform = 'translateY(0px)';
  }

  setTimeout(() => {
    flap.style.transition = 'none';
  }, 300);
});

// ------------------ PULL TAB ------------------

const pullTab = document.querySelector('.pull-tab');
const letter = document.querySelector('.letter');

let isPulling = false;
let startPullY = 0;
let baseHeight = 200;

pullTab.addEventListener('mousedown', (e) => {
  isPulling = true;
  startPullY = e.clientY;
  pullTab.style.cursor = 'grabbing';
});


document.addEventListener('mousemove', (e) => {
  if (!isPulling) return;

  const pullDistance = e.clientY - startPullY;
  const limitedPull = Math.max(0, Math.min(pullDistance, 400));

  letter.style.height = `${baseHeight + limitedPull}px`;
});

document.addEventListener('mouseup', () => {
  isPulling = false;
  pullTab.style.cursor = 'grab';
});
