import { useState, useEffect, useRef } from 'react';
import { debtAPI } from '@/lib/debt-api';

export function useDebtCounter(initialValue?: string) {
  const [debt, setDebt] = useState(initialValue || '$37,840,931,900,999');
  const lastInitialValue = useRef<string | undefined>(undefined);

  // Update base debt when initialValue changes (but only once per unique value)
  useEffect(() => {
    if (initialValue && initialValue !== lastInitialValue.current) {
      lastInitialValue.current = initialValue;
      
      // Parse the initial value to seed the counter from the correct amount
      const numericValue = parseFloat(initialValue.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        debtAPI.setBaseDebt(numericValue);
      }
    }
  }, [initialValue]);

  // Subscribe to debt updates (only once on mount)
  useEffect(() => {
    const unsubscribe = debtAPI.subscribeToUpdates((newDebt) => {
      setDebt(newDebt);
    });

    return unsubscribe;
  }, []); // Empty deps - only run once on mount

  return debt;
}
