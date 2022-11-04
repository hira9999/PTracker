import { UserInputValue, DecodedJwt, Product } from './interfaces';

interface InitialAuthState {
  loading: boolean;
  data: null | DecodedJwt;
  error: boolean;
  token: null | string;
  errResponse: any;
}

interface AuthContextInterface<T> {
  state: InitialAuthState;
  loginUser: <T>(userData: T) => Promise<void>;
  registerUser: <T>(userData: T) => Promise<void>;
  authReset: () => void;
}

type AuthReducerAction =
  | { type: 'SET_TOKEN'; payload: InitialAuthState['token'] }
  | { type: 'AUTH_START' }
  | { type: 'AUTH_FAILURE'; payload: any }
  | { type: 'AUTH_SUCCESS'; payload: DecodedJwt }
  | { type: 'AUTH_RESET' };

interface InitialTrackerState {
  data: null | Product[];
  loading: boolean;
  errResponse: any;
  error: boolean;
}

interface TrackersContextInterface<T> {
  state: InitialTrackerState;
  createItem: <T>(values: T) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  editItem: (id: string) => Promise<void>;
}

type TrackerReducerAction =
  | { type: 'TRACKER_START' }
  | { type: 'TRACKER_SUCCESS'; payload: Product[] }
  | { type: 'TRACKER_FAILURE'; payload: any }
  | { type: 'TRACKER_RESET' }
  | { type: 'ITEM_DELETE'; payload: Product }
  | { type: 'ITEM_CREATE'; payload: Product }
  | { type: 'ITEM_EDIT'; payload: Product };

export type {
  AuthReducerAction,
  AuthContextInterface,
  TrackersContextInterface,
  InitialTrackerState,
  InitialAuthState,
  TrackerReducerAction,
};
