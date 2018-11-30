document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('#particleContainer');
    const pixelSize = parseInt(container.getAttribute('data-pixel-size'), 10);
    const explosionSize = parseInt(container.getAttribute('data-explosion-size'), 10);
    const maxVelocity = parseInt(container.getAttribute('data-max-velocity'), 10);

    container.addEventListener('click', (e) => {
        const canvas = container.appendChild(particleLayer(container));
        canvas.style.position = 'absolute';
        render(
            canvas,
            seed(explosionSize, maxVelocity, cursorPosition(canvas, e)),
            createPixelImage(pixelSize, randomColour())
        );
    });
});

function seed(numberOfParticles, maxVelocity, coordinates) {
    return Array(numberOfParticles)
        .fill(null)
        .map(() => {
            const direction = unitVector();

            return particle(
                coordinates,
                resize(maxVelocity, direction),
                [Math.random() * direction[0], Math.random()])
        });
}

function particleLayer(container) {
    const width = document.createAttribute('width');
    width.value = container.offsetWidth;

    const height = document.createAttribute('height');
    height.value = container.offsetHeight;

    const layer = document.createElement('canvas');
    layer.setAttributeNode(width);
    layer.setAttributeNode(height);

    return layer;
}

function cursorPosition(element, event) {
    const rect = element.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
}

