import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout, { buttonClass, inputClass } from '../components/AuthLayout';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Start tracking your income and expenses">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>}
        <input className={inputClass} name="name" placeholder="Full name"
          value={form.name} onChange={handleChange} required />
        <input className={inputClass} type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />
        <input className={inputClass} type="password" name="password" placeholder="Password (min 6 characters)"
          value={form.password} onChange={handleChange} minLength={6} required />
        <button className={buttonClass} disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}