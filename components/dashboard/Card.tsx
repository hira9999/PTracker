import Image from 'next/image';
import React from 'react';
import { Product } from '../../types/interfaces';
import { timeSince } from '../../utils/timeSince';
import styles from './Card.module.css';
import { useTrackerDelete } from '../../hooks/useTrackerQuery';
import { useTrackerRefresh } from '../../hooks/useTrackerQuery';

interface Item {
  item: Product;
}

const Card = ({ item }: Item) => {
  const deleteMutation = useTrackerDelete(item._id);
  const refreshMutation = useTrackerRefresh(item._id);

  const onDelete = () => {
    deleteMutation.mutate();
  };
  const onRefesh = () => {
    refreshMutation.mutate();
  };

  return (
    <div className={item.isPriceMeet ? styles.card_active : styles.card}>
      {/* header */}
      <div className={styles.header}>
        <h2 className={styles.title}> {item.product_name}</h2>
        <div className={styles.icon} onClick={onDelete}>
          <Image alt="trash" src="/trash.svg" width={30} height={30} />
        </div>
      </div>

      <h5 className={styles.subtitle}>판매처:{item.shop_name}</h5>

      <p className={styles.last_update}>
        Updated {timeSince(item.updated)} ago
      </p>

      {/* price area */}
      <div className={styles.price_wrap}>
        <div className={styles.price_box}>
          <p>Request Price</p>
          <span>₩{item.desired_price}</span>
        </div>
        <div className={styles.price_box}>
          <p>Last Price</p>
          <span>₩{item.last_price}</span>
        </div>
      </div>

      {/* controller */}
      <div className={styles.control}>
        <span onClick={onRefesh}>{'Renewal'}</span>
        <a href={item.siteUrl}>VISIT SITE</a>
      </div>
    </div>
  );
};

export default Card;
