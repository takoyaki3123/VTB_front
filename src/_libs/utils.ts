import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ErrorResponse, FetchError, FetchSuccess } from './api/common.type';

/**
 * @param inputs - 接受一個或多個類別字串或條件物件。
 * @returns - 回傳一個合併且無衝突的類別字串。
 * * 功能：
 * 1. 使用 clsx 根據條件合併類別字串。
 * 2. 使用 twMerge 解決 Tailwind CSS 類別之間的衝突 (例如 'p-4' 和 'p-6' 只保留後者)。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImagePath(url: string) {
  return '/' + url;
}

export function getTouchData(
  e:
    | TouchEvent
    | MouseEvent
    | React.TouchEvent<HTMLElement>
    | React.MouseEvent<HTMLElement>
) {
  return 'changedTouches' in e ? e.changedTouches[0] : e;
}

export function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    'message' in data
  );
}

export function isError(data: unknown): data is FetchError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    isErrorResponse(data.error)
  );
}
export function ApiResponseHelper(data: ErrorResponse): FetchError;
export function ApiResponseHelper<T extends object>(data: T): FetchSuccess<T>;
export function ApiResponseHelper<T extends object>(
  data: T | ErrorResponse
): FetchSuccess<T> | FetchError {
  return isErrorResponse(data) ? { error: data } : { data };
}
