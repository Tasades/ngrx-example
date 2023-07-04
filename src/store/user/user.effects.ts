import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {concatMap, of, take} from "rxjs";
import {UserActions} from "./user.actions";
import {UserModelInBackend, UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private service: UserService
  ) {
  }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAll),
      concatMap(() => {
        return this.service.getUser$().pipe(take(1), concatMap(users => {
          const mappedUsers = users.map(this.mapUser);

          return of(UserActions.loadedAll({users: mappedUsers}))
        }))
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap((props) => {
        return this.service.createUser({
          firstName: props.user.firstName,
          lastName: props.user.lastName
        }).pipe(take(1), concatMap(createdUser => {
          return of(UserActions.createdUser({user: this.mapUser(createdUser)}))
        }))
      })
    )
  );

  mapUser(user: UserModelInBackend): User {
    return {
      id: user.id,
      name: user.firstName + ((user.lastName) ? ' ' + user.lastName : '')
    };
  }

}
