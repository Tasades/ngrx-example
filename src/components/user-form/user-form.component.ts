import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserStoreModule } from "../../store/user/user.store.module";
import { Store } from "@ngrx/store";
import { UserState } from "../../models/user";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserActions } from "../../store/user/user.actions";
import { selectFirstValues, selectSecondValues, selectUserInCreation } from "../../store/user/user.selectors";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

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
    firstSelect: new FormControl<string | undefined>(undefined),
    secondSelect: new FormControl<string | undefined>(undefined)
  })
  isInCreation$ = this.store.select(selectUserInCreation);

  firstValues$ = this.store.select(selectFirstValues);
  secondValues$ = this.store.select(selectSecondValues);



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
    this.switchLists();
    this.isInCreation$.pipe(untilDestroyed(this)).subscribe(isUserInCreation => {
      if (isUserInCreation) {
        this.form.disable()
      } else {
        this.form.enable()
      }
    })
    this.form.controls.firstSelect.valueChanges.pipe(untilDestroyed(this)).subscribe(newValue => {
      if (!newValue) return;
      this.store.dispatch(UserActions.selectFirstValueItem({item: newValue}))
    });
  }

  list: 'A' | 'B' = 'A';
  switchLists(): void {
    if (this.list === 'A') {
      this.form.controls.firstSelect.patchValue('BC', {emitEvent: false});
      this.form.controls.secondSelect.patchValue('BCD', {emitEvent: false});

      this.store.dispatch(UserActions.loadFirstValues({someId: 'B'}));
      this.store.dispatch(UserActions.loadSecondValues({firstValue: 'BC'}));
      this.list = 'B';
    } else {
      this.form.controls.firstSelect.patchValue('AD', {emitEvent: false});
      this.form.controls.secondSelect.patchValue('ADE', {emitEvent: false});

      this.store.dispatch(UserActions.loadFirstValues({someId: 'A'}));
      this.store.dispatch(UserActions.loadSecondValues({firstValue: 'AD'}));
      this.list = 'A';
    }
  }
}
