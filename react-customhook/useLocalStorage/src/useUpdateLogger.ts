import { useEffect } from 'react';

export default function useUpdateLogger(value: string): void {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
