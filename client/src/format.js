export const CURRENCIES = {
  PKR: { label: 'PKR (Rs.)', symbol: 'Rs.', badge: 'Rs', space: true },
  USD: { label: 'USD ($)', symbol: '$', badge: '$', space: false },
  EUR: { label: 'EUR (€)', symbol: '€', badge: '€', space: false },
  GBP: { label: 'GBP (£)', symbol: '£', badge: '£', space: false },
  AED: { label: 'AED', symbol: 'AED', badge: 'AED', space: true },
};

export const DEFAULT_CURRENCY = 'PKR';

// formatMoney(2500, 'PKR') -> "Rs. 2,500"   formatMoney(42.3, 'USD') -> "$42.30"
export const formatMoney = (n, code = DEFAULT_CURRENCY) => {
  const { symbol, space } = CURRENCIES[code] || CURRENCIES[DEFAULT_CURRENCY];
  const value = Number(n) || 0;
  const decimals = Number.isInteger(value) ? 0 : 2;
  const amount = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${value < 0 ? '-' : ''}${symbol}${space ? ' ' : ''}${amount}`;
};