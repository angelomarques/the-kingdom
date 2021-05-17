export function getTimerUnities(time, allSplited) {
  const [minuteTens, minuteUnities] = String(Math.floor(time / 60))
    .padStart(2, 0)
    .split("");

  const [secondTens, secondUnities] = String(time % 60)
    .padStart(2, 0)
    .split("");

  if (allSplited) {
    return [minuteTens, minuteUnities, secondTens, secondUnities];
  }
  return [minuteTens + minuteUnities, secondTens + secondUnities];
}
