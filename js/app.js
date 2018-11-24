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
    .map(() => {
      const direction = unitVector();

      return particle(
        root,
        resize(20, direction),
        [Math.random() * direction[0], Math.random()])
    });
}

function cursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
}

