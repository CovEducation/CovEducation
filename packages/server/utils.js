const generateFutureUnixTimestamp = (deltaSeconds) => {
  const currentTimeSeconds = Math.round((Date.now() / 1000));
  return currentTimeSeconds + deltaSeconds;
};

module.exports = {
  generateFutureUnixTimestamp,
};
