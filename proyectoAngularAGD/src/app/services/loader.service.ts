import { Injectable } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public _sidenav: SidenavService
  ) { }

  public active:boolean = false;

  public On():void {
    this._sidenav.close();
    this.active = true;
  }

  public Off():void {
    this.active = false;
  }

}
