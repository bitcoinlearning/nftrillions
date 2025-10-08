import { useState, useEffect } from 'react';
import { debtAPI } from '@/lib/debt-api';

export function useDebtCounter(initialValue?: string) {
  const [debt, setDebt] = useState(initialValue || '$37,000,000,000,000');

  // Update debt when initialValue changes (from API)
  useEffect(() => {
    if (initialValue) {
      setDebt(initialValue);
      
      // Parse the initial value to seed the counter from the correct amount
      const numericValue = parseFloat(initialValue.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        debtAPI.setBaseDebt(numericValue);
      }
    }
  }, [initialValue]);

  useEffect(() => {
    const unsubscribe = debtAPI.subscribeToUpdates((newDebt) => {
      setDebt(newDebt);
    });

    return unsubscribe;
  }, []);

  return debt;
}
