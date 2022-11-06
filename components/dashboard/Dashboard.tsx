import React, { useContext } from 'react';
import Card from './Card';
import { AuthContext } from '../../context/auth/authContext';
import { TrackerContext } from '../../context/traker/trackerContext';
import styles from './Dashboard.module.css';
import TrackerForm from './TrackerForm';
import { Product } from '../../types/interfaces';
import { useQuery } from '@tanstack/react-query';
import { trackerAPI } from '../../utils/apiUtil';
import { GET_TRACKERS_STALETIME } from '../../constants';

const DashboardLayout = () => {
  const { state } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery(
    ['trackers'],
    async () => {
      console.log('get');
      return await trackerAPI.get('/');
    },
    { staleTime: GET_TRACKERS_STALETIME }
  );
  const trackers = data?.data?.trackers;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h3>Welcome {state?.data?.userName},</h3>
        <p>Welcome to pTracker ,Easy way to track products online</p>
      </div>
      <TrackerForm />
      {!isLoading &&
        trackers.map((item: Product) => <Card key={item._id} item={item} />)}
    </div>
  );
};

export default DashboardLayout;
