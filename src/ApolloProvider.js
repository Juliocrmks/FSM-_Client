import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { split } from '@apollo/client'
import { WebSocketLink} from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';

let httpLink = createHttpLink({
  uri: "https://serene-shore-04523.herokuapp.com/graphql",
});
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: "ws://serene-shore-04523.herokuapp.com/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  },
});



const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
