import API from '@/_libs/api';
import useAPI from './useAPI';
import { useQuery } from '@tanstack/react-query';
import { isError } from '@/_libs/utils';
import { getQueryClient } from '@/_libs/tanstack/getQueryClient';

const fetchHomeData = async (api: ReturnType<typeof API>) => {
  const response = await api.home.getHomeData();
  if (isError(response)) {
    throw new Error(response.error.message);
  }
  return response.data;
};

export const getHomeInfo = async () => {
  const headers = new Headers();
  const path = 'http://localhost:8000/api/';
  const api = API(path, { options: { headers, method: 'GET' } });
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['home'],
    queryFn: async () => await fetchHomeData(api),
  });
  return queryClient;
};

export const useHomeInfo = () => {
  const api = useAPI();

  return useQuery({
    queryKey: ['home'],
    queryFn: async () => await fetchHomeData(api),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
