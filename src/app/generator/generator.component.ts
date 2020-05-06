import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreService, Store } from '../store.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorComponent implements OnInit {
  grid: string[][];
  code: string;
  gridColumnSize: string;
  control = new FormControl();

  store$: Observable<Store>;

  constructor(private store: StoreService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store$ = this.store.state.pipe(
      tap(
        ({ grid, code, gridColumnSize }) => {
          this.grid = grid;
          this.code = code;
          this.gridColumnSize = gridColumnSize;
          this.cdr.detectChanges();
        }
      )
    )
  }

  validateInput(): void {
    if (this.control.value) {
      if (this.control.value.length > 1) {
        this.control.setValue(this.control.value[1]);
      }
      this.control.disable();
      setTimeout(() => { this.control.enable(); }, 4000)
    }
    this.store.inputChar = this.control.value;
  }



}
