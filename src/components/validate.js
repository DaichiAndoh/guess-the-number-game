function isValidNumber(input, min = 0, max = 100) {
  return typeof input === 'number' && input >= min && input <= max;
}

module.exports = {
  isValidNumber,
};
