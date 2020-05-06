import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Store { grid: string[][], code: string, gridColumnSize: string, payments: any[] };

export interface Payment {
  name: string, ammount: string, code: string, grid: string[][]
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _state$: BehaviorSubject<Store>;

  FIRST_CHAR_NUMBER = 97;
  LAST_CHAR_NUMBER = 122;

  GRID_SIZE = 10;

  grid: string[][] = [];
  gridColumnSize: string;
  code: string;
  charsStore: {};

  timeout: NodeJS.Timeout;

  payments: Payment[] = [];

  inputChar: string;

  constructor() { }

  init(): void {
    this._state$ = new BehaviorSubject({ grid: this.grid, code: this.code, gridColumnSize: this.gridColumnSize, payments: this.payments });
    this.gridGenerator();
  }

  get state() {
    return this._state$.asObservable();
  }

  // setState(nextState: T): void {
  //   this._state$.next(nextState);
  // }

  addPayment(name: string, ammount: string): void {
    this.payments.push({ name, ammount, code: this.code, grid: [...this.grid] });
    this._state$.next({ grid: this.grid, code: this.code, gridColumnSize: this.gridColumnSize, payments: this.payments })
  }

  gridGenerator(): void {
    let char: string;
    let charCount: number;

    if (this.inputChar) {
      char = this.inputChar;
      charCount = Math.floor((this.GRID_SIZE * this.GRID_SIZE) * .2);
    }

    this.grid = [];
    this.gridColumnSize = '';
    this.charsStore = {};

    for (let i = 0; i < this.GRID_SIZE; i++) {
      this.grid[i] = [];

      for (let j = 0; j < this.GRID_SIZE; j++) {
        if (charCount) {
          charCount--;
        } else {
          char = this.getRandomChar();
        }
        this.grid[i].push(char)

        if (this.charsStore[char]) {
          this.charsStore[char]++;
        } else {
          this.charsStore[char] = 1;
        }
      }
      this.gridColumnSize += ' auto'
    }

    this.getCode();
  }

  getCode(): void {
    const date = new Date();
    const seconds = date.getSeconds().toString();
    const chars = [];

    if (+seconds > 9) {
      chars[0] = this.grid[seconds[0]][seconds[1]];
      chars[1] = this.grid[seconds[1]][seconds[0]];
    } else {
      chars[0] = this.grid[0][seconds];
      chars[1] = this.grid[seconds][0];
    }

    const f = this.charsStore[chars[0]];
    const s = this.charsStore[chars[1]]

    this.code = `${f > 9 ? 9 : f}${s > 9 ? 9 : s}`;

    this._state$.next({ grid: this.grid, code: this.code, gridColumnSize: this.gridColumnSize, payments: this.payments })

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => { this.gridGenerator(); console.log('repeat'); }, 2000);
  }

  getRandomChar(): string {
    return String.fromCharCode(
      Math.floor(
        Math.random() * (this.LAST_CHAR_NUMBER - this.FIRST_CHAR_NUMBER))
      + this.FIRST_CHAR_NUMBER
    );
  }
}
