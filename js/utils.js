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

function randomInteger(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColour() {
  return `rgba(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(0, 255)}, 255)`;
}

