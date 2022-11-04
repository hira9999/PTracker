import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.banner}>
          Welcome to{' '}
          <Link href={`/dashboard`}>
            <a>Price Traker!</a>
          </Link>
        </h1>

        <div className={styles.section}>
          <div className={styles.decription}>
            <p className={styles.text}>
              Get products on your favourite Online store at your desired price.
            </p>
            <p className={styles.subtext}>
              Keeping up with product prices online can be very tedious. But
              With pTracker, you can track those products without having to
              worry. As soon as the product sells at the desired price you
              chose, we will notify you with an email alert.
            </p>
            <div className={styles.button_wrapper}>
              <button>Get Start</button>
              <button>Learn More</button>
            </div>
          </div>
          <div className={styles.img}>
            <Image
              alt="stock"
              src="/stock.svg"
              width={500}
              height={500}
              className={styles.img}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
