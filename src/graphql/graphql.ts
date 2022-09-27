import {
  ApolloClient, InMemoryCache, ApolloProvider, gql,
} from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities';

// const errorLink = ApolloClient.onError(({ graphqlErrors, networkError }) => {
//    if (graphqlErrors) {
//      graphqlErrors.map(({ message, location, path }) => {
//        alert(`Graphql error ${message}`);
//      });
//    }
//  });

//  const link = from([
//    errorLink,
//    new HttpLink({ uri: "http://localhost:6969/graphql" }),
//  ]);

export const clientApollo = new ApolloClient({
  // cache: new InMemoryCache({}),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: offsetLimitPagination(),
        },
      },
    },

  }),
  // link: link,
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
});