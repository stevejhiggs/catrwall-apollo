import ApolloClient from 'apollo-boost';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/component';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>, 
  document.getElementById('root')
);

