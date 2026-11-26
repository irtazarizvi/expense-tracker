import { useCurrency } from '../context/CurrencyContext';

export default function SummaryCards({ summary }) {
  const { format } = useCurrency();
  const cards = [
    { label: 'Total Balance', value: summary.balance, style: 'bg-indigo-600 text-white', sub: 'text-indigo-100' },
    { label: 'Total Income', value: summary.income, style: 'bg-white ring-1 ring-slate-200', sub: 'text-slate-500', valueColor: 'text-emerald-600' },
    { label: 'Total Expense', value: summary.expense, style: 'bg-white ring-1 ring-slate-200', sub: 'text-slate-500', valueColor: 'text-rose-600' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-2xl p-5 shadow-sm ${c.style}`}>
          <p className={`text-sm font-medium ${c.sub}`}>{c.label}</p>
          <p className={`mt-2 text-2xl font-semibold sm:text-3xl ${c.valueColor || ''}`}>
            {format(c.value)}
          </p>
        </div>
      ))}
    </div>
  );
}