function particle(coordinates, vector, acceleration) {
    return {coordinates, vector, acceleration};
}

function seed(numberOfParticles, coordinates) {
    return Array(numberOfParticles)
        .fill(null)
        .map(() => {
            const direction = unitVector();

            return particle(
                coordinates,
                resize(20, direction),
                [Math.random() * direction[0], Math.random()])
        });
}

