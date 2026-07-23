/**
 * Transforma '2026-07-28T16:02:00' em '28 Jul, 2026'
 */
export function formatDate(isoDateString: string): string {
  if (!isoDateString) return '';

  // Separa apenas a parte da data 'YYYY-MM-DD' para evitar problemas de Timezone
  const [datePart] = isoDateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);

  // Array com a abreviação dos meses em inglês
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthName = months[month - 1];

  return `${day} ${monthName}, ${year}`;
}

/**
 * Transforma '2026-07-28T16:02:00' em '16:02'
 */
export function formatTime(isoDateString: string): string {
  if (!isoDateString) return '';

  // Pega a parte após o 'T' e extrai apenas Hora e Minutos (HH:mm)
  const [, timePart] = isoDateString.split('T');
  const [hours, minutes] = timePart.split(':');

  return `${hours}:${minutes}`;
}

export function isLessThan24HoursAway(dateString: string): boolean {
  const targetDate = new Date(dateString).getTime();
  const now = new Date().getTime();

  // Difference in milliseconds
  const diffInMs = targetDate - now;

  // 24 hours converted to milliseconds (24h * 60m * 60s * 1000ms)
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  // Returns true if the date is in the future AND less than 24 hours away
  return diffInMs > 0 && diffInMs < twentyFourHoursInMs;
}
