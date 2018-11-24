function particle(coordinates, vector, acceleration) {
  return {coordinates, vector, acceleration};
}

function move({coordinates, vector, acceleration}) {
  return particle(
    coordinates.map((point, index) => point + vector[index]),
    vector.map((basis, index) => basis + acceleration[index]),
    acceleration
  );
}