import { InitialTrackerState, TrackerReducerAction } from '../../types/context';

export const TrackerReducer = (
  state: InitialTrackerState,
  action: TrackerReducerAction
) => {
  switch (action.type) {
    case 'TRACKER_START':
      return {
        ...state,
        loading: true,
        error: false,
        errResponse: null,
      };

    case 'TRACKER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case 'TRACKER_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      };
    case 'TRACKER_RESET':
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
      };

    case 'ITEM_DELETE':
      const tempData = state.data
        .slice()
        .filter((data) => data._id !== action.payload._id);
      return {
        ...state,
        data: tempData,
        loading: false,
        error: false,
        errResponse: '',
      };

    case 'ITEM_CREATE':
      return {
        ...state,
        data: [action.payload, ...state.data],
        loading: false,
        error: false,
        errResponse: '',
      };

    case 'ITEM_EDIT':
      const tempState = state.data.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        data: tempState,
        loading: false,
        error: false,
        errResponse: '',
      };

    default:
      return state;
  }
};
