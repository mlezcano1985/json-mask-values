/**
 * Returns a visible section of a email address.
 * @param value Email address to mask.
 * @param char Character to use as mask. Default `*`.
 */
export default function email(value: string, char = '*'): string {
  let result = value;
  const [username, domain] = result.split('@');

  domain.split('.').forEach(d => {
    const visible = d.length > 1 ? 1 : d.length;
    const mask = char.repeat(d.length - visible);
    const visibleValue = d.slice(0, visible);
    const maskValue = visibleValue + mask;
    result = result.replace(d, maskValue);
  });

  const visible = username.length > 2 ? 2 : username.length;
  const mask = char.repeat(username.length - visible);
  const visibleValue = username.slice(0, visible);
  const maskValue = visibleValue + mask;
  result = result.replace(username, maskValue);

  return result;
}
