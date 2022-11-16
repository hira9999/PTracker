import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './TrackerForm.module.css';
import { useTrackerPost } from '../../hooks/useTrackerQuery';

const TrackerForm = () => {
  const createTrackerMutation = useTrackerPost();

  const initialValue = {
    productURL: '',
    desired_price: 0,
  };

  const createTracker = () => {
    createTrackerMutation.mutate(values);
  };

  const { values, onChange, onSubmit } = useForm<typeof initialValue>(
    createTracker,
    initialValue
  );

  return (
    <div className={styles.wrap}>
      <form onSubmit={(event) => onSubmit(event)} className={styles.form}>
        <div>
          <label>Product URL</label>
          <input
            type="text"
            required
            placeholder="Please copy the url of the lowest price site on Naver"
            name="productURL"
            onChange={(e) => onChange(e)}
            value={values.productURL}
            className={styles.input}
          />
          <label>Tracking Price</label>
          <input
            type="number"
            required
            name="desired_price"
            placeholder="Enter your desired price(won)"
            onChange={(e) => onChange(e)}
            value={values.desired_price}
            className={styles.input}
          />
        </div>
        <div className={styles.button_wrap}>
          <button type="submit">ADD Tracker</button>
        </div>
      </form>
    </div>
  );
};

export default TrackerForm;
