# 💰 Full-Stack Expense Tracker

A clean, modern full-stack personal finance and expense tracking web application built with React, Node.js, Express, and SQLite. Track your income and expenses, filter by category, and switch between multiple currencies seamlessly.

## ✨ Features

- **User Authentication:** Secure Register and Login system using JWT authentication.
- **Transaction Management:** Add and delete income and expense entries with descriptions, categories, and dates.
- **Real-Time Summary Cards:** Automatically calculates Total Balance, Total Income, and Total Expenses.
- **Category Filtering:** Filter transactions effortlessly by category.
- **Multi-Currency Support:** Switch between **PKR, USD, EUR, GBP, and AED** with preferences saved in `localStorage`.
- **Responsive UI:** Styled with Tailwind CSS for a clean experience across desktop and mobile screens.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Context API (`AuthContext`, `CurrencyContext`)

**Backend:**
- Node.js & Express.js
- SQLite Database
- JSON Web Tokens (JWT) & bcrypt

## 📂 Project Structure

```text
expense-tracker/
├── client/          # React + Vite frontend
│   ├── public/      # Static assets
│   └── src/         # Components, Contexts, and Pages
└── server/          # Node.js + Express backend
    ├── middleware/  # JWT auth middleware
    └── routes/      # Auth & Transactions API routes
