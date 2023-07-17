import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, SelectControlValueAccessor } from "@angular/forms";

@Component({
  selector: 'app-my-select',
  templateUrl: './my-select.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySelectComponent<T> extends SelectControlValueAccessor{
  @Input()
  elements: T[] | undefined;
}
