import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';
import DisplayData from '../src/DisplayData';

export default function Home() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3001/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <h1>List of Users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}
