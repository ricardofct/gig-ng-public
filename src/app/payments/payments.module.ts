import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeModule } from '../code/code.module';


@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodeModule
  ]
})
export class PaymentsModule { }
