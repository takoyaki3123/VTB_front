import { $GetHomeResponse } from '../types/base.type';
import type { GetHomeResponse } from '../types/base.type';
import { APIType } from './common.type';

const group = (api: APIType) => {
  // api('', {
  //   $requestValid: z.safeParse()
  // })
};

export const home = (api: APIType) => ({
  async getHomeData(options = { method: 'GET' }) {
    const data = await api.fetch<GetHomeResponse>('home', {
      $responseValid: (data) => $GetHomeResponse.safeParse(data),
      ...options,
    });
    return data;
  },
  // api('', {
  //   $requestValid: z.safeParse()
  // })
});
