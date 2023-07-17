import {EntityState} from "@ngrx/entity";

export interface User {
  id: string;
  name: string;
}


export interface UserState extends EntityState<User> {
  isLoading: boolean;
  userInCreation: boolean;
  error: null;

  firstValues: string[];
  secondValues: string[];
}
