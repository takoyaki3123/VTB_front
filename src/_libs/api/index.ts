/**
 * needs:
 * 1. api instance
 * 2. user implement
 * 3. group implement
 * 4. home implement
 *
 * what api instance need to do?
 * preprocess for fetch
 * process for fetch response
 * process for fetch data with error
 *
 */

import { ApiResponseHelper, isError } from '../utils';
import { home } from './base';
import { ApiConfig, APIType } from './common.type';

function UrlProcessor(path: string) {
  // check url valid
  return path;
}

const API = (basePath: string, config: ApiConfig = {}) => {
  const api: APIType = {
    basePath,
    async fetch(path, { baseUrl, onRequest, onResponse, onError, ...options }) {
      try {
        if (onRequest) {
          const requestResult = onRequest?.();
          if (requestResult) {
            return ApiResponseHelper(requestResult);
          }
        }

        if (options.$requestValid) {
          const requestValidResult = options.$requestValid();
          if (!requestValidResult.success) {
            throw requestValidResult.error;
          }
        }

        const response = await fetch(
          (baseUrl || basePath) + UrlProcessor(path),
          {
            ...config.options,
            ...options,
          }
        );

        const responseResult = onResponse?.(response);
        if (responseResult) {
          return ApiResponseHelper(responseResult);
        }

        const json = await response.json();
        if (options.$responseValid) {
          const responseValidResult = options.$responseValid(json);
          if (!responseValidResult.success) {
            throw responseValidResult.error;
          }
        }
        return ApiResponseHelper(json);
      } catch (error) {
        if (isError(error)) {
          if (onError) {
            onError(error.error);
          }
          return ApiResponseHelper(error.error);
        }
        throw error;
      }
    },
  };
  return { basePath, api, home: home(api) };
};

export default API;
