import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Footer from '../components/Footer';
import CurrencyBadge from '../components/CurrencyBadge';
import CurrencySelector from '../components/CurrencySelector';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      const query = category ? `?category=${encodeURIComponent(category)}` : '';
      const [list, sum, cats] = await Promise.all([
        api(`/transactions${query}`),
        api('/transactions/summary'),
        api('/transactions/categories'),
      ]);
      setTransactions(list);
      setSummary(sum);
      setCategories(cats);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async (data) => {
    await api('/transactions', { method: 'POST', body: data });
    await loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await api(`/transactions/${id}`, { method: 'DELETE' });
      // if the last item of a filtered category is deleted, reset the filter
      if (category && transactions.length === 1) setCategory('');
      else await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <CurrencyBadge />
            <span className="truncate text-lg font-semibold">Expense Tracker</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-sm text-slate-600 md:inline">Hi, {user?.name}</span>
            <CurrencySelector />
            <button onClick={logout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6">
        {error && <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>}
        <SummaryCards summary={summary} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TransactionForm onAdd={handleAdd} />
          </div>
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              categories={categories}
              category={category}
              onCategoryChange={setCategory}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}