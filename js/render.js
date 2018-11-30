function render(canvas, particles, pixel) {
    const context = canvas.getContext('2d');
    const animationData = preCalculate(particles);
    console.info(animationData);
    requestAnimationFrame(drawFrame.bind(null, animationData));

    function drawFrame(frames) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        frames.shift().forEach(coordinates => context.drawImage(pixel, coordinates[0], coordinates[1]));

        if (frames.length > 0) {
            requestAnimationFrame(drawFrame.bind(null, frames));
        } else {
            canvas.remove();
        }
    }

    function preCalculate(particles, animationData = []) {
        if (particles.length === 0) {
            return animationData;
        } else {
            const nextFrame = particles.map(move).filter(isInBounds);
            return preCalculate(
                nextFrame,
                animationData.concat([
                    nextFrame.map(particle => particle.coordinates)
                ])
            );
        }
    }

    function isInBounds(particle) {
        return (particle.coordinates[0] > 0 && particle.coordinates[0] < canvas.width &&
            particle.coordinates[1] > 0 && particle.coordinates[1] < canvas.height);
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
