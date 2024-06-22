import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({template: ""})
export abstract class BaseComponent implements OnDestroy {
  private readonly _destroy = new Subject<void>();
  protected destroy$ = this._destroy.asObservable();

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
