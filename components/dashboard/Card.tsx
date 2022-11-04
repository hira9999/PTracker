import Image from 'next/image';
import React, { useContext } from 'react';
import { TrackerContext } from '../../context/traker/trackerContext';
import { Product } from '../../types/interfaces';
import { timeSince } from '../../utils/timeSince';
import styles from './Card.module.css';

interface Item {
  item: Product;
}

const Card = ({ item }: Item) => {
  const {
    deleteItem,
    editItem,
    state: { loading },
  } = useContext(TrackerContext);

  const renewal = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    editItem(item._id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{item.product_name}</h2>
        <div className={styles.icon} onClick={(e) => deleteItem(item._id)}>
          <Image alt="trash" src="/trash.svg" width={30} height={30} />
        </div>
      </div>

      <h5 className={styles.subtitle}>판매처:{item.shop_name}</h5>

      <p className={styles.last_update}>
        Updated {timeSince(item.updated)} ago
      </p>
      <div className={styles.price_wrap}>
        <div className={styles.price_box}>
          <p>Request Price</p>
          <span>₩{item.desired_price.toLocaleString('en-US')}</span>
        </div>
        <div className={styles.price_box}>
          <p>Last Price</p>
          <span>₩{item.last_price}</span>
        </div>
      </div>
      <div className={styles.control}>
        <span onClick={(e) => renewal(e)}>
          {loading ? 'Updating..' : 'Renewal'}
        </span>
        <a href={item.siteUrl}>VISIT SITE</a>
      </div>
    </div>
  );
};

export default Card;
