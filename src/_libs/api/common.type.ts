import { ZodSafeParseResult } from 'zod';
// type use Upper camel

export type ErrorResponse = {
  code: string;
  message: string;
  details?: string;
};

//
export type ApiConfig = {
  options?: RequestInit;
  onRequest?: () => ErrorResponse | void; // before fetch api
  onResponse?: (response: Response) => ErrorResponse | void; // after fetch api, check response
  onError?: (error: ErrorResponse) => void; // after check reponse, if there's an error in data
};

// TRequest is generics like T. void make rd doesn't need specified type every time
export type FetchOption<TRequest = void> = RequestInit & {
  baseUrl?: string;
  onRequest?: () => ErrorResponse | void; // before fetch api
  onResponse?: (response: Response) => ErrorResponse | void; // after fetch api, check response
  onError?: (error: ErrorResponse) => void; // after check reponse, if there's an error in data
  $requestValid?: () => ZodSafeParseResult<TRequest>;
  $responseValid?: (data: unknown) => ZodSafeParseResult<unknown>;
};

export type APIRequest<TRequest = void> = {
  params?: TRequest;
  options?: FetchOption<TRequest>;
};

export type APIType = {
  basePath: string;
  fetch<Response = void, Request = void>(
    path: string,
    options: FetchOption<Request>
  ): Promise<FetchSuccess<Response> | FetchError>;
};

// when fetch error will get this type
export type FetchError = {
  error: ErrorResponse;
};

// when fetch success will get this type
export type FetchSuccess<T> = {
  data: T;
};
