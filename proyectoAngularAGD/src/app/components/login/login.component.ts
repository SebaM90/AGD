import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoaderService } from 'src/app/services/loader.service';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginResponse, ItemObject, UserObject, SessionUser } from 'src/app/shared/interface';

import * as $AB from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _loader: LoaderService,
    private _api: ApiService,
    private _storage: StorageService
  ) {}

  ngOnInit() {
    if (this._storage.isToken()) { this.apiLogin() }
  }

  ngAfterContentInit() {
  }

  pruebaJquery(){
    (<any>$('#boton')).addClass('ui button primary');
  }

  public currentUser:UserObject;
  public loginUser: string = "sebam90";
  public loginPass: string = "LaMorsa666";

  uiLoading(val:boolean){
  (val) ? this._loader.On() : this._loader.Off();
  }

  apiLogin(){
    this.uiLoading(true);
    let user = this.loginUser
    let pass = this.loginPass
    this._api.login(user, pass).subscribe(
      (response:LoginResponse) => {
        this._storage.setToken( response.session_token )
        this.apiGetUserInfo()
      }, (err) => { this.errorHandler(err) },
            () => { this.completeHandler() }
    )
  }

  apiGetUserInfo() {
    this.uiLoading(true)
    this._api.getSession().subscribe( (response:SessionUser) =>  {
      this._api.getUser(response.session.glpiID).subscribe( (response2:UserObject) => {
        this.currentUser = response2
        this.currentUser.minPic = "https://ping.webhop.org:8889/glpi/front/document.send.php?file=_pictures/" + this.currentUser.picture.replace('.png','_min.png')
        this.currentUser.maxPic = "https://ping.webhop.org:8889/glpi/front/document.send.php?file=_pictures/" + this.currentUser.picture
      }, (err) => { this.errorHandler(err) },
            () => { this.completeHandler() }
      )
    })
  }

  apiCloseSession(){
    this.uiLoading(true)
    this._api.killSession().subscribe(
      (response:LoginResponse) => {
        this._storage.removeToken()
      }, (err) => { this.errorHandler(err) },
            () => { this.completeHandler() }
    )
  }

  // apiGetAllItems(tipoElemento:string){
  //   this.uiLoading(true)
  //   this._api.getAllItems(tipoElemento).subscribe(
  //     (response:ItemObject) => {
  //       this.allItems = response
  //       this.uiLoading(false)
  //     }, (err) => {
  //       this.errorHandler(err)
  //     }
  //   )
  // }

  private errorHandler(err:any){
    alert( JSON.stringify(err) );
    console.warn(err);
  }

  private completeHandler(){
    this._loader.Off();
  }
}