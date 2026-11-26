import { CURRENCIES } from '../format';
import { useCurrency } from '../context/CurrencyContext';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      aria-label="Currency"
      className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm font-medium outline-none hover:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    >
      {Object.entries(CURRENCIES).map(([code, c]) => (
        <option key={code} value={code}>{c.label}</option>
      ))}
    </select>
  );
}