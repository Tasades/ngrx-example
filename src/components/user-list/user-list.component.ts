import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UserStoreModule} from "../../store/user/user.store.module";
import {UserState} from "../../models/user";
import {Store} from "@ngrx/store";
import {selectAllUser, selectIsLoading} from "../../store/user/user.selectors";
import {UserActions} from "../../store/user/user.actions";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    UserStoreModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  private store: Store<{user: UserState}> = inject(Store);

  users$ = this.store.select(selectAllUser);
  isLoading$ = this.store.select(selectIsLoading);

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadAll());
  }
}
