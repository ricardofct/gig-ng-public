import { Component, OnInit } from '@angular/core';
import { StoreService, Store } from './store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'exercise';
  store$: Observable<Store>;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.init();

    this.store$ = this.store.state;
  }
}
