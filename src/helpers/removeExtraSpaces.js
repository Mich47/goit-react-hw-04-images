export function removeExtraSpaces(string) {
  return string
    .split(' ')
    .filter(word => word !== '')
    .join(' ');
}
