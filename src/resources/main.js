const rainContainer = document.getElementById("rain");
const speedRange = document.getElementById("speedRange");

const colors = ["#283747", "#5D6D7E", "#5D6D7E", "#2E4053", "#2E4053"];

function createRaindrop() {
  const raindrop = document.createElement("div");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const speedFactor = parseFloat(speedRange.value);

  raindrop.classList.add("raindrop");

  raindrop.style.left = `${Math.random() * 100}vw`;
  raindrop.style.animationDuration = `${(Math.random() * 1 + 0.5) / speedFactor}s`;
  raindrop.style.animationDelay = `${Math.random() * 2}s`;
  raindrop.style.backgroundColor = randomColor;

  rainContainer.appendChild(raindrop);

  setTimeout(() => {
    raindrop.remove();
  }, 3000);
}

setInterval(createRaindrop, 100);
