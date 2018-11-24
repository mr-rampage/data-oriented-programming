const canvas = document.getElementById('particleCanvas');

canvas.addEventListener('click', (e) =>
  render(
    canvas.getContext('2d'),
    seed(1000, cursorPosition(canvas, e)),
    createPixelImage(2, randomColour())
  )
);

function seed(numberOfParticles, root) {
  return Array(numberOfParticles)
    .fill(null)
    .map(() => particle(
      root,
      resize(30, unitVector()),
      [0, 1]
    ));
}

function cursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
}

