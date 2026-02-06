import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query';

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000, //expired time
        retry: isServer ? 0 : 3,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending', // use to prerender
      },
    },
  });
}

let queryClientInstance: QueryClient | null = null;

export const getQueryClient = () => {
  if (isServer) {
    return makeClient();
  } else {
    if (queryClientInstance === null) {
      queryClientInstance = makeClient();
    }

    return queryClientInstance;
  }
};
