const animationWorker = new Worker('js/animation-worker.js');

function render(canvas, particles, pixel) {
    const context = canvas.getContext('2d');

    animationWorker.postMessage([canvas.width, canvas.height, particles]);
    animationWorker.onmessage = function (e) {
        requestAnimationFrame(drawFrame(e.data));
    };

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
