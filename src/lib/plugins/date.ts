/**
 * Returns a visible section of a date string.
 * @param value Date string to mask.
 * @param char Character to use as mask. Default `*`.
 */
export default function date(value: string, char = '*'): string {
  let d = value;
  const pattern = /(\d+)/g;
  const r = d.match(pattern);

  if (r !== null) {
    r.forEach(el => {
      const visible = el.length > 1 ? 1 : el.length;
      const mask = char.repeat(el.length - visible);
      const visibleValue = el.slice(-visible);
      const maskValue = mask + visibleValue;
      d = d.replace(el, maskValue);
    });
  }

  return d;
}
