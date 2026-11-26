import { useCurrency } from '../context/CurrencyContext';

// Logo square that shows the selected currency symbol
export default function CurrencyBadge({ size = 'h-9 w-9 rounded-lg' }) {
  const { info } = useCurrency();
  const text = info.badge.length > 2 ? 'text-xs' : info.badge.length > 1 ? 'text-sm' : 'text-lg';
  return (
    <div className={`grid shrink-0 place-items-center bg-indigo-600 font-bold text-white ${size} ${text}`}>
      {info.badge}
    </div>
  );
}