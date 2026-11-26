import { useCurrency } from '../context/CurrencyContext';

export default function TransactionList({ transactions, categories, category, onCategoryChange, onDelete }) {
  const { format } = useCurrency();

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {transactions.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">
          No transactions yet. Add your first one!
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {transactions.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-semibold ${
                  t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {t.type === 'income' ? '+' : '−'}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.description || t.category}</p>
                  <p className="text-xs text-slate-500">{t.category} · {t.date}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '−'}{format(t.amount)}
                </span>
                <button onClick={() => onDelete(t.id)} aria-label="Delete transaction"
                  className="rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}