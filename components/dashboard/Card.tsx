import Image from 'next/image';
import React, { useContext } from 'react';
import { TrackerContext } from '../../context/traker/trackerContext';
import { Product } from '../../types/interfaces';
import { timeSince } from '../../utils/timeSince';
import styles from './Card.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trackerAPI } from '../../utils/apiUtil';

interface Item {
  item: Product;
}

const Card = ({ item }: Item) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => trackerAPI.delete(`/${item._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });
  const onDelete = () => {
    deleteMutation.mutate();
  };

  const refreshMutation = useMutation({
    mutationFn: () => trackerAPI.patch(`/${item._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });
  const onRefesh = () => {
    refreshMutation.mutate();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{item.product_name}</h2>
        <div className={styles.icon} onClick={onDelete}>
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
          <span>₩{item.desired_price}</span>
        </div>
        <div className={styles.price_box}>
          <p>Last Price</p>
          <span>₩{item.last_price}</span>
        </div>
      </div>
      <div className={styles.control}>
        <span onClick={onRefesh}>{'Renewal'}</span>
        <a href={item.siteUrl}>VISIT SITE</a>
      </div>
    </div>
  );
};

export default Card;
