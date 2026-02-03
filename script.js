const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const images = [];
let loadedImages = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawFrame(currentFrame);
});

function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const frameNumber = String(i).padStart(3, "0");
    img.src = `images/ezgif-frame-${frameNumber}.jpg`;
    img.onload = () => loadedImages++;
    images.push(img);
  }
}

let currentFrame = 0;

function drawFrame(index) {
  if (!images[index]) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[index];
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / scrollHeight;
  currentFrame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => drawFrame(currentFrame));
});

preloadImages();
