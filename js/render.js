function render(context, particles, pixel) {
  requestAnimationFrame(drawFrame.bind(null, preCalculate(particles)));

  function drawFrame(frames) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    frames
      .shift()
      .map(particle => particle.coordinates)
      .forEach(coordinates => context.drawImage(pixel, coordinates[0], coordinates[1]));

    if (frames.length > 0) {
      requestAnimationFrame(drawFrame.bind(null, frames));
    }
  }

  function isInBounds(particle) {
    return (particle.coordinates[0] > 0 && particle.coordinates[0] < context.canvas.width &&
      particle.coordinates[1] > 0 && particle.coordinates[1] < context.canvas.height);
  }

  function preCalculate(particles, frameData = [particles]) {
    const futureParticles = particles.map(move).filter(isInBounds);
    frameData.push(futureParticles);
    return (futureParticles.length > 0) ? preCalculate(futureParticles, frameData) : frameData;
  }
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
