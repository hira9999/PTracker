import React, { useContext } from 'react';
import Card from './Card';
import { AuthContext } from '../../context/auth/authContext';
import { TrackerContext } from '../../context/traker/trackerContext';
import styles from './Dashboard.module.css';
import TrackerForm from './TrackerForm';
import { Product } from '../../types/interfaces';

const DashboardLayout = () => {
  const { state } = useContext(AuthContext);
  const {
    state: { data, errResponse, error },
  } = useContext(TrackerContext);

  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.errorBox}>
          <p>{errResponse.err}</p>
        </div>
      ) : null}
      <div className={styles.info}>
        <h3>Welcome {state?.data?.userName},</h3>
        <p>Welcome to pTracker , Easy way to track products online</p>
      </div>
      <TrackerForm />

      {data && data.map((item: Product) => <Card key={item._id} item={item} />)}
    </div>
  );
};

export default DashboardLayout;
