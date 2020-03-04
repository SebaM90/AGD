import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { LoaderService } from 'src/app/services/loader.service';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginResponse, UserObject, SessionUser } from 'src/app/shared/interface';
import { Router } from '@angular/router';
import * as $AB from 'jquery';
import { observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private _loader: LoaderService,
    private _api: ApiService,
    private _storage: StorageService
  ) {}

  ngOnInit() {
    ( this._storage.getSavedUser() ) ? this.loginUser = this._storage.getSavedUser() : this.loginUser = '';
    ( this._storage.getSavedPass() ) ? this.loginPass = this._storage.getSavedPass() : this.loginPass = '';
    if ( this._storage.isToken() ) { this.apiLogin() }
  }

  ngAfterContentInit() {
  }

  pruebaJquery(){
    (<any>$('#boton')).addClass('ui button primary');
  }

  public currentUser:UserObject;
  public loginUser: string = '' //"sebam90";
  public loginPass: string = '' //"LaMorsa666";

  uiLoading(val:boolean){
    (val) ? this._loader.On() : this._loader.Off();
  }

  apiLogin(){
    this.uiLoading(true);
    let user = this.loginUser
    let pass = this.loginPass
    this._api.login(user, pass).subscribe(
      (response:LoginResponse) => {
        this._storage.setToken( response.session_token );

        this._storage.setSavedUser(user);
        this._storage.setSavedPass(pass);
        
        // MOSTRAR INFORMACION DE USUARIO -------
        // this.apiGetUserInfo();       
        this.router.navigate(['/reclamos/nuevo']); // Quitar esta linea si se descomenta lo anterior
        // --------------------------------------

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

          timer(1500).subscribe( () => { 
            this.router.navigate(['/reclamos/nuevo']); // DELAY / RETRASO ANTES DE RE-DIRIGIR A LA PAGINA DE NUEVOS RECLAMOS
          })
          this.router.navigate(['/reclamos/nuevo']);
          
      }, (err) => { this.errorHandler(err) },
            () => { this.completeHandler() }
      )
    })
  }

  apiCloseSession(deleteSavedCredentials:boolean=false) {

    if ( this._storage.isToken() ) { // Primero veo si ya NO cerró sesion aun

        if ( confirm("¿Esta seguro?") ) {

          this.uiLoading(true)

          this._api.killSession().subscribe(
            (response:LoginResponse) => {
              this._storage.removeToken();
              if (deleteSavedCredentials) this._storage.removeALL();
            }, (err) => { this.errorHandler(err) },
                  () => { this.completeHandler() }
          )

        }

    } else if ( deleteSavedCredentials ) { // Si ya esta cerrada la sesion PERO quiere borrar credenciales

        this.removeAllClose(); // Borro credenciales del storage y limipio inputs

    }

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
    console.warn(err);
    this.removeAllClose();
    this._loader.Off();
    alert(err.error[1])
  }

  private completeHandler(){
    this._loader.Off();
  }

  private removeAllClose(){
    this.loginUser = '';
    this.loginPass = '';
    this._storage.removeALL();
  }
}