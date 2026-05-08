export const formatCurrency = (amount: number, currency = 'USD', lang = 'en') =>
  new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);

export const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]+/g, '')
    .replace(/--+/g, '-');
