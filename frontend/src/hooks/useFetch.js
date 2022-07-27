import useSWR from 'swr';
import api from '../services/api';

const useFetch = (endpoint) => {
  const fetcher = async (endpoint) => {
    const response = await api.get(endpoint);
    return response.data.data;
  };

  const { data, error, mutate, isValidating } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !data && !error,
  };
};

export { useFetch };
