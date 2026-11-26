const express = require('express');
const { run, get, all } = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth); // every route below requires a valid JWT

// GET /api/transactions?category=Food&type=expense
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let sql = 'SELECT * FROM transactions WHERE user_id = ?';
    const params = [req.user.id];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (type === 'income' || type === 'expense') {
      sql += ' AND type = ?';
      params.push(type);
    }
    sql += ' ORDER BY date DESC, id DESC';

    res.json(await all(sql, params));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/transactions/summary
router.get('/summary', async (req, res) => {
  try {
    const row = await get(
      `SELECT
         COALESCE(SUM(CASE WHEN type = 'income'  THEN amount END), 0) AS income,
         COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS expense
       FROM transactions WHERE user_id = ?`,
      [req.user.id]
    );
    res.json({ income: row.income, expense: row.expense, balance: row.income - row.expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/transactions/categories
router.get('/categories', async (req, res) => {
  try {
    const rows = await all(
      'SELECT DISTINCT category FROM transactions WHERE user_id = ? ORDER BY category',
      [req.user.id]
    );
    res.json(rows.map((r) => r.category));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { type, amount, category, description = '', date } = req.body;
    const value = Number(amount);

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be income or expense' });
    }
    if (!Number.isFinite(value) || value <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const txDate = date || new Date().toISOString().slice(0, 10);
    const { id } = await run(
      `INSERT INTO transactions (user_id, type, amount, category, description, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, type, value, category.trim(), description.trim(), txDate]
    );

    res.status(201).json(await get('SELECT * FROM transactions WHERE id = ?', [id]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { changes } = await run(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (changes === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted', id: Number(req.params.id) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;