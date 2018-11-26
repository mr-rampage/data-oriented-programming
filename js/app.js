const canvas = document.getElementById('particleCanvas');
const pixelRenderer = render.bind(null, canvas.getContext('2d'));

canvas.addEventListener('click', (e) =>
  pixelRenderer(
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

