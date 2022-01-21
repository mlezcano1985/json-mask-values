/**
 * Returns a visible section of a string.
 * @param value String to mask.
 * @param left Visible characters on the left.
 * @param right Visible characters on the right.
 * @param char Character to use as mask. Default `*`.
 */
export default function ends(
  value: string,
  left: number,
  right: number,
  char = '*',
): string {
  const absLeft = Math.abs(left);
  const absRight = Math.abs(right);
  const count = value.length - (absLeft + absRight);
  const mask = char.repeat(count);
  return value.slice(0, absLeft) + mask + value.slice(-absRight);
}
