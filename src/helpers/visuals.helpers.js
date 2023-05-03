export const getPercentageInRange = (min, max, value) => {
  return value <= min ? 0 : value >= max ? 1 : parseFloat(((value - min) / (max - min)).toFixed(2))
}
