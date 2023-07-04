import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../models/user";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load All': emptyProps(),
    'Loaded All': props<{ users: User[] }>(),
    'Create User': props<{user: {firstName: string, lastName?: string}}>(),
    'Created User': props<{user: User}>(),
  },
});
