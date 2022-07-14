import { useState, useEffect } from 'react';

function useCheckCount(count: number) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (count > 1) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  });

  return isAvailable;
}

export default useCheckCount;
