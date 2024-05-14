import { createReducer, on } from '@ngrx/store';
import { loadUsers } from './user.actions';

export interface UserState {
  users: any[];
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
);