export function getDateString(date: Date): string {
  const month: string = date.toLocaleString('es-es', { month: 'long' });
  return `${ date.getFullYear() } ${ month.charAt(0).toUpperCase() + month.slice(1) }`;
}
