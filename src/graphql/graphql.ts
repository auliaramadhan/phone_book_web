import {
  ApolloClient, InMemoryCache, ApolloProvider, gql,
} from '@apollo/client'

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
        }
      }
    }

  }),
  // link: link,
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
});