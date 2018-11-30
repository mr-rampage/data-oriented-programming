const animationWorker = new Worker('js/animation-worker.js');

function render(canvas, particles, pixel) {
    const context = canvas.getContext('2d');

    if (window.Worker) {
        animationWorker.postMessage([canvas.width, canvas.height, particles]);
        animationWorker.onmessage = function (e) {
            requestAnimationFrame(drawFrame(e.data));
        };
    } else {
        requestAnimationFrame(drawFrame(preCalculate(particles)));
    }

    function drawFrame(frames) {
        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            frames.shift().forEach(coordinates => context.drawImage(pixel, coordinates[0], coordinates[1]));

            if (frames.length > 0) {
                requestAnimationFrame(drawFrame(frames));
            } else {
                canvas.remove();
            }
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
