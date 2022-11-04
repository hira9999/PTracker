import Head from 'next/head';
import Home from '../components/home/Home';

export default function home() {
  return (
    <>
      <Head>
        <title>PTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
}
