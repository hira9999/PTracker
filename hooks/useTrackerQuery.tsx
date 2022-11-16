import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GET_TRACKERS_STALETIME } from '../constants';
import { Product } from '../types/interfaces';
import { trackerAPI } from '../utils/apiUtil';

interface IGETTrackersResponse {
  success: boolean;
  trackers: Product[];
}

const getTrackers = (): Promise<IGETTrackersResponse> =>
  trackerAPI.get('/').then((response) => response.data);

const useGetTrackers = () => {
  return useQuery<IGETTrackersResponse, AxiosError>(
    ['trackers'],
    () => getTrackers(),
    {
      staleTime: GET_TRACKERS_STALETIME,
    }
  );
};

const useTrackerDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => trackerAPI.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });
};

interface TrackerFormValue {
  desired_price: number;
  productURL: string;
}

const useTrackerPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TrackerFormValue) => trackerAPI.post('/', values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });
};

const useTrackerRefresh = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => trackerAPI.patch(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackers'] });
    },
  });
};

export { useGetTrackers, useTrackerRefresh, useTrackerDelete, useTrackerPost };
