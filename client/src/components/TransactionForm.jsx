import { useState } from 'react';
import { inputClass } from './AuthLayout';
import { useCurrency } from '../context/CurrencyContext';

const CATEGORIES = {
  expense: ['Food', 'Transport', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
};

const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD
const emptyForm = { type: 'expense', amount: '', category: 'Food', description: '', date: today() };

export default function TransactionForm({ onAdd }) {
  const { info } = useCurrency();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      // reset category when switching between income and expense
      setForm({ ...form, type: value, category: CATEGORIES[value][0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await onAdd({ ...form, amount: Number(form.amount) });
      setForm({ ...emptyForm, type: form.type, category: CATEGORIES[form.type][0] });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold">Add transaction</h2>
      {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>}

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
        {['expense', 'income'].map((t) => (
          <button key={t} type="button"
            onClick={() => handleChange({ target: { name: 'type', value: t } })}
            className={`rounded-md py-1.5 text-sm font-medium capitalize transition ${
              form.type === t
                ? t === 'income' ? 'bg-emerald-600 text-white shadow' : 'bg-rose-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <input className={inputClass} type="number" name="amount" placeholder={`Amount (${info.symbol})`}
        min="0.01" step="0.01" value={form.amount} onChange={handleChange} required />

      <select className={inputClass} name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES[form.type].map((c) => <option key={c}>{c}</option>)}
      </select>

      <input className={inputClass} name="description" placeholder="Description (optional)"
        value={form.description} onChange={handleChange} maxLength={100} />

      <input className={inputClass} type="date" name="date" value={form.date} onChange={handleChange} required />

      <button disabled={submitting}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
        {submitting ? 'Adding…' : 'Add transaction'}
      </button>
    </form>
  );
}