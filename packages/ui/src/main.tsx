import ApolloClient from 'apollo-boost';
import { createRoot } from 'react-dom/client';
import App from './components/App/component';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
