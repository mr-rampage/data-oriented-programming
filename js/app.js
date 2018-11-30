const container = document.querySelector('#particleContainer');

container.addEventListener('click', (e) => {
    const canvas = container.appendChild(particleLayer(container));
    render(
        canvas,
        seed(500, cursorPosition(canvas, e)),
        createPixelImage(2, randomColour())
    );
});

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

function cursorPosition(element, event) {
    const rect = element.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
}

