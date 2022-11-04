import { trackerAPI } from '../../utils/apiUtil';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { AuthContext } from '../auth/authContext';
import { TrackerReducer } from './trackerReducer';
import { TrackersContextInterface } from '../../types/context';

const initalTrackerState = {
  loading: true,
  data: null,
  error: false,
  errResponse: null,
};

export const TrackerContext =
  createContext<TrackersContextInterface<unknown> | null>(null);

export const TrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    state: { token },
  } = useContext(AuthContext);

  const [state, dispatch] = useReducer(TrackerReducer, initalTrackerState);

  const getAllItems = useCallback(async () => {
    try {
      dispatch({ type: 'TRACKER_START' });
      if (token) {
        const res = await trackerAPI.get('/');
        const trackers = res.data.trackers;
        dispatch({ type: 'TRACKER_SUCCESS', payload: trackers });
      }
    } catch (err) {
      dispatch({ type: 'TRACKER_FAILURE', payload: err.response.data });
    }
  }, [token]);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const createItem = async <T,>(values: T) => {
    try {
      dispatch({ type: 'TRACKER_START' });
      const res = await trackerAPI.post('/', values);
      const newItem = res.data.newItem;
      dispatch({ type: 'ITEM_CREATE', payload: newItem });
    } catch (err) {
      dispatch({ type: 'TRACKER_FAILURE', payload: err.response.err });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      dispatch({ type: 'TRACKER_START' });
      const res = await trackerAPI.delete(`/${id}`);
      const deletedItem = res.data.deletedItem;
      dispatch({ type: 'ITEM_DELETE', payload: deletedItem });
    } catch (err) {
      dispatch({ type: 'TRACKER_FAILURE', payload: err.response.data });
    }
  };

  const editItem = async (id: string) => {
    try {
      dispatch({ type: 'TRACKER_START' });
      const res = await trackerAPI.patch(`/${id}`);
      const updatedItem = res.data.updatedItem;
      dispatch({ type: 'ITEM_EDIT', payload: updatedItem });
    } catch (err) {
      dispatch({ type: 'TRACKER_FAILURE', payload: err.response.data });
    }
  };

  return (
    <TrackerContext.Provider
      value={{ state, createItem, deleteItem, editItem }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
