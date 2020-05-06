import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, StoreService, Payment } from '../store.service';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit {

  store$: Observable<Store>;
  code: string;
  payments: Payment[];

  form: FormGroup;

  constructor(private store: StoreService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store$ = this.store.state.pipe(
      tap(({ code, payments }) => {
        this.code = code;
        this.payments = payments;
        this.cdr.detectChanges();
      })
    )

    this.form = this.fb.group(
      {
        ammount: [null, Validators.required],
        name: [null, Validators.required]
      }
    );
  }

  addPayment({ name, ammount }: { name: string, ammount: string }): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.addPayment(name, ammount);
    this.formReset();
  }

  formReset(): void {
    Object.keys(this.form.controls).forEach(
      controlName => {
        this.form.get(controlName).setValue(null);
        this.form.get(controlName).markAsUntouched();
        this.form.get(controlName).updateValueAndValidity();
      }
    )
  }

}
