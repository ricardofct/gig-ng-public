import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './generator.component';
import { CodeComponent } from '../code/code.component';
import { CodeModule } from '../code/code.module';


@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodeModule
  ]
})
export class GeneratorModule { }
