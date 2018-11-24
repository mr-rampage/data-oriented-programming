function unitVector() {
  const direction = () => Math.random() >= 0.5 ? 1 : -1;
  const vector = [direction() * Math.random(), direction() * Math.random()];
  return normalize(vector);

  function hypotenus(vector) {
    return Math.sqrt(vector.reduce((length, basis) => length + basis * basis, 0))
  }

  function normalize(vector) {
    const length = hypotenus(vector);
    return vector.map(basis => basis / length);
  }
}

function resize(size, unitVector) {
  const length = () => Math.floor(Math.random() * size) + 0.5;
  return unitVector.map(basis => basis * length());
}

function seed(numberOfParticles) {
  return Array(numberOfParticles)
    .fill(null)
    .map(() => particle(
      [200, 200],
      resize(25, unitVector()),
      [0, 1]
    ));
}

