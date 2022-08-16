import useSWR from 'swr';
import api from '../services/api';

const useFetch = (endpoint, { onSuccessCallback = () => {}, onErrorCallback = () => {} } = {}) => {
  const fetcher = async (endpoint) => {
    const response = await api.get(endpoint);
    return response.data.data;
  };

  const { data, error, mutate, isValidating } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    onError: onErrorCallback,
    onSuccess: onSuccessCallback,
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
