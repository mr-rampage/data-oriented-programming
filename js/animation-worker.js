onmessage = function(e) {
    const width = e.data[0];
    const height = e.data[1];
    const particles = e.data[2];

    const isInBounds = boundaryCheck.bind(null, width, height);

    postMessage(preCalculate(particles));

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

    function boundaryCheck(width, height, particle) {
        return (particle.coordinates[0] > 0 && particle.coordinates[0] < width &&
            particle.coordinates[1] > 0 && particle.coordinates[1] < height);
    }
};

function move({coordinates, vector, acceleration}) {
    return {
        coordinates: coordinates.map((point, index) => point + vector[index]),
        vector: vector.map((basis, index) => basis + acceleration[index]),
        acceleration: acceleration
    };
}
