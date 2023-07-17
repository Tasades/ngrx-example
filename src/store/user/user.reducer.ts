import { Action, createReducer, on } from "@ngrx/store";
import { User, UserState } from "../../models/user";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { UserActions } from "./user.actions";

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: model => model.id
});

const initialState: UserState = adapter.getInitialState({
  isLoading: false,
  userInCreation: false,
  error: null,
  firstValues: [],
  secondValues: [],
});


const reducer = createReducer<UserState>(
  initialState,
  on(UserActions.loadAll, (state, _) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(UserActions.loadedAll, (state, loadedAll) => {
    const newState = adapter.setAll(loadedAll.users, state);
    return {
      ...newState,
      isLoading: false
    };
  }),
  on(UserActions.createUser, (state, _) => {
    return {
      ...state,
      userInCreation: true,
    };
  }),
  on(UserActions.createdUser, (state, change) => {
    const newState = adapter.addOne(change.user, state);
    return {
      ...newState,
      userInCreation: false,
    };
  }),
  on(UserActions.loadFirstValues, (state, change) => {
    return {
      ...state,
      firstValues: []
    } as UserState;
  }),
  on(UserActions.loadSecondValues, (state, change) => {
    return {
      ...state,
      secondValues: []
    } as UserState;
  }),
  on(UserActions.selectFirstValueItem, (state, change) => {
    return {
      ...state,
      secondValues: [],
    } as UserState;
  }),
  on(UserActions.loadedFirstValues, (state, change) => {
    return {
      ...state,
      firstValues: change.values,
    } as UserState;
  }),
  on(UserActions.loadedSecondValues, (state, change) => {
    return {
      ...state,
      secondValues: change.values,
    } as UserState;
  })
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
