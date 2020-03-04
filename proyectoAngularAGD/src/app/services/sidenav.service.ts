import { Injectable, OnInit } from '@angular/core';
import * as $AB from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  public show:boolean = false

  public effects() {
    (<any>$('.ui.menu')).sidebar('setting', 'transition', 'push');    
  }

  public open() {
    (<any>$('.ui.menu')).sidebar('show');
  }

  public close() {
    (<any>$('.ui.menu')).sidebar('hide');
  }

  public toggle() {
    (<any>$('.ui.menu')).sidebar('toggle');
  }
}
