import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../../models/user";
import {adapter} from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUser = adapter.getSelectors(selectUserState).selectAll;

export const selectIsLoading = createSelector(selectUserState, (state): boolean => {
  return state.isLoading
})

export const selectUserInCreation = createSelector(selectUserState, (state): boolean => {
  return state.userInCreation
})


export const selectFirstValues = createSelector(selectUserState, (state): string[] => {
  return state.firstValues
})


export const selectSecondValues = createSelector(selectUserState, (state): string[] => {
  return state.secondValues
})
