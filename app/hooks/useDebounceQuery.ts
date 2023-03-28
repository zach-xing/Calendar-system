import { useState, useEffect } from "react";
import { QueryFunction, useQuery } from "react-query";

/**
 * 把 React Query 中的 useQuery 做了一层防抖
 */
export const useDebounceQuery = (
  params: string | string[],
  request: QueryFunction,
  { debounce, ...options }: any = {}
) => {
  const [newParams, setNewParams] = useState(params);
  const stringify = (obj: any) => JSON.stringify(obj);

  useEffect(() => {
    if (stringify(params) !== stringify(newParams)) {
      const timerId = setTimeout(() => setNewParams(params), debounce);
      return () => clearTimeout(timerId);
    }
  }, [params]);

  return useQuery(newParams, request, options);
};
