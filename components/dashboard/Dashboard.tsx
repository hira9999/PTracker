import React, { useContext, useEffect } from 'react';
import Card from './Card';
import { AuthContext } from '../../context/auth/authContext';
import styles from './Dashboard.module.css';
import TrackerForm from './TrackerForm';
import { useGetTrackers } from '../../hooks/useTrackerQuery';

const DashboardLayout = () => {
  const { state } = useContext(AuthContext);

  const { data, isLoading, error } = useGetTrackers();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h3>Welcome {state?.data?.userName},</h3>
        <p>Welcome to pTracker ,Easy way to track products online</p>
      </div>
      <TrackerForm />
      {data?.trackers?.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
};

export default DashboardLayout;
