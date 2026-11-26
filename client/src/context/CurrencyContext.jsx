import { createContext, useContext, useState } from 'react';
import { CURRENCIES, DEFAULT_CURRENCY, formatMoney } from '../format';

const CurrencyContext = createContext(null);

const getSavedCurrency = () => {
  const saved = localStorage.getItem('currency');
  return CURRENCIES[saved] ? saved : DEFAULT_CURRENCY;
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(getSavedCurrency);

  const setCurrency = (code) => {
    localStorage.setItem('currency', code);
    setCurrencyState(code);
  };

  const value = {
    currency,
    setCurrency,
    info: CURRENCIES[currency],
    format: (n) => formatMoney(n, currency),
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);