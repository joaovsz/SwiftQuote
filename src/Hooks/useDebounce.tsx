import { useEffect, useState } from "react";

export const useDebounce = () => {
    const [timeoutToClear, setTimeoutToClear] = useState<
      NodeJS.Timeout | undefined
    >();
  
    useEffect(() => {
      return () => {
        clearTimeout(timeoutToClear);
      };
    }, []);
  
    const debounce = (callback: any, ms: number) => {
      return (...args: any) => {
        clearTimeout(timeoutToClear);
        setTimeoutToClear(
          setTimeout(() => {
            callback(...args);
          }, ms),
        );
      };
    };
  
    return { debounce };
  };
  