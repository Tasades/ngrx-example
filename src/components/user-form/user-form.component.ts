import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UserStoreModule} from "../../store/user/user.store.module";
import {Store} from "@ngrx/store";
import {UserState} from "../../models/user";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserActions} from "../../store/user/user.actions";
import {selectUserInCreation} from "../../store/user/user.selectors";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    UserStoreModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class UserFormComponent implements OnInit {
  private store: Store<{ user: UserState }> = inject(Store);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>(''),
  })
  isInCreation$ = this.store.select(selectUserInCreation);

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(UserActions.createUser({
        user: {
          firstName: this.form.controls.firstName.value ?? '',
          lastName: this.form.controls.firstName.value ?? undefined,
        }
      }))
    }
  }

  ngOnInit(): void {
    this.isInCreation$.pipe(untilDestroyed(this)).subscribe(isUserInCreation => {
      if (isUserInCreation) {
        this.form.disable()
      } else {
        this.form.enable()
      }
    })
  }
}
