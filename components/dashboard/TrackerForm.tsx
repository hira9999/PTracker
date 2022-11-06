import React, { useContext, useState } from 'react';
import { TrackerContext } from '../../context/traker/trackerContext';
import { useForm } from '../../hooks/useForm';
import styles from './TrackerForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trackerAPI } from '../../utils/apiUtil';

interface IValue {
  productURL: string;
  desired_price: string;
}

const TrackerForm = () => {
  const initialValue = {
    productURL: '',
    desired_price: '',
  };
  const queryClient = useQueryClient();

  const [values, setValues] = useState<IValue>(initialValue);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [(e.target as HTMLTextAreaElement).name]: (
        e.target as HTMLTextAreaElement
      ).value,
    });
  };

  const createItem = useMutation({
    mutationFn: (values: IValue) => {
      console.log('post');
      return trackerAPI.post('/', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createItem.mutate(values);
  };

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
          <button type="submit">ADD ITEM</button>
        </div>
      </form>
    </div>
  );
};

export default TrackerForm;
