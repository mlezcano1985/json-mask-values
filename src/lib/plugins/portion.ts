/**
 * Returns a visible section of a string.
 * @param value String to mask.
 * @param visible Visible characters of the string. Positive from begin. Negative from end.
 * @param char Character to use as mask. Default `*`.
 */
export default function portion(
  value: string,
  visible: number,
  char = '*',
): string {
  const count = value.length - Math.abs(visible);
  const mask = char.repeat(count);
  if (visible < 0) {
    return mask + value.slice(visible);
  }
  return value.slice(0, visible) + mask;
}
