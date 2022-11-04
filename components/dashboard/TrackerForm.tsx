import React, { useContext } from 'react';
import { TrackerContext } from '../../context/traker/trackerContext';
import { useForm } from '../../hooks/useForm';
import styles from './TrackerForm.module.css';

const TrackerForm = () => {
  const initialValue = {
    productURL: '',
    desired_price: '',
  };
  const {
    state: { loading },
    createItem,
  } = useContext(TrackerContext);

  const { values, onChange, onSubmit } = useForm<typeof initialValue>(
    createItem,
    initialValue
  );

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} className={styles.form}>
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
          <button type="submit">{loading ? 'Loading' : 'ADD ITEM'}</button>
        </div>
      </form>
    </div>
  );
};

export default TrackerForm;
