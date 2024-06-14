const rainContainer = document.getElementById("rain");
const speedRange = document.getElementById("speedRange");

const colors = ["#283747", "#5D6D7E", "#5D6D7E", "#2E4053", "#2E4053"];

function getValidSpeedFactor() {
  const value = parseFloat(speedRange.value);
  return isNaN(value) || value < 0.1 || value > 2 ? 0.5 : value;
}

function createRaindrop() {
  const raindrop = document.createElement("div");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const speedFactor = getValidSpeedFactor();
  const animationDuration = (Math.random() * 1 + 0.5) / speedFactor;

  raindrop.classList.add("raindrop");

  raindrop.style.left = `${Math.random() * 100}vw`;
  raindrop.style.animationDuration = `${animationDuration}s`;
  raindrop.style.animationDelay = `${Math.random() * 2}s`;
  raindrop.style.backgroundColor = randomColor;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(raindrop);
  rainContainer.appendChild(fragment);

  setTimeout(
    () => {
      raindrop.remove();
    },
    (animationDuration + 2) * 1000,
  );
}

let lastTimestamp = 0;
const interval = 100;

function step(timestamp) {
  if (timestamp - lastTimestamp >= interval) {
    createRaindrop();
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(step);
}

requestAnimationFrame(step);

speedRange.addEventListener("input", () => {
  const raindrops = document.querySelectorAll(".raindrop");
  raindrops.forEach((raindrop) => {
    const speedFactor = getValidSpeedFactor();
    const animationDuration =
      parseFloat(raindrop.style.animationDuration) / speedFactor;
    raindrop.style.animationDuration = `${animationDuration}s`;
  });
});
