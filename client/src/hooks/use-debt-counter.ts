import { useState, useEffect } from 'react';
import { debtAPI } from '@/lib/debt-api';

export function useDebtCounter(initialValue?: string) {
  const [debt, setDebt] = useState(initialValue || '$37,840,931,900,999');

  useEffect(() => {
    // Update debt when initialValue changes (from API)
    if (initialValue) {
      setDebt(initialValue);
      
      // Parse the initial value to seed the counter from the correct amount
      const numericValue = parseFloat(initialValue.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        debtAPI.setBaseDebt(numericValue);
      }
    }

    // Subscribe to debt updates
    const unsubscribe = debtAPI.subscribeToUpdates((newDebt) => {
      setDebt(newDebt);
    });

    return unsubscribe;
  }, [initialValue]);

  return debt;
}
