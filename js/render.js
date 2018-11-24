const canvas = document.getElementById('particleCanvas');
const canvasContext = canvas.getContext('2d');

function render(context, particles, pixel) {
  const clear = () => context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  const renderParticle = (coordinates) => context.drawImage(pixel, coordinates[0], coordinates[1]);
  const isInCanvas = isInBounds.bind(null, context.canvas);

  requestAnimationFrame(drawFrame.bind(null, preCalculate(particles)));

  function drawFrame(worldData) {
    clear();
    worldData.pop().map(particle => particle.coordinates).forEach(renderParticle);
    if (worldData.length > 0) {
      requestAnimationFrame(drawFrame.bind(null, worldData));
    }
  }

  function preCalculate(particles, frameData = [particles]) {
    const futureParticles = particles.map(move).filter(isInCanvas);
    frameData.push(futureParticles);
    return (futureParticles.length > 0) ? preCalculate(futureParticles, frameData) : frameData.reverse();
  }
}

function isInBounds(canvas, particle) {
  return (particle.coordinates[0] > 0 && particle.coordinates[0] < canvas.width &&
    particle.coordinates[1] > 0 && particle.coordinates[1] < canvas.height);
}

function createPixelData(size, colour) {
  const data = Array(size * size)
    .fill(null)
    .reduce(data => data.concat(colour), []);
  return new ImageData(Uint8ClampedArray.from(data), 2);
}

function createPixelImage(size, colour) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  context.fillStyle = colour;
  context.fillRect(0, 0, size, size);

  return canvas;
}

render(
  canvasContext,
  seed(2500),
  createPixelImage(1, 'rgba(190, 0, 210, 255)')
);
