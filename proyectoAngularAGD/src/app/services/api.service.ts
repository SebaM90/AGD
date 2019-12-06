import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from 'src/app/services/storage.service';
import { LoginResponse, ItemObject, UserObject, SessionUser } from '../shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public currentUser:Observable<SessionUser>;

  constructor(
    private _storage: StorageService,
    private _http: HttpClient
  ) {}

  //private API_URL: string = "https://ping.webhop.org:8889/glpi/apirest.php/"
  private API_URL: string = "/glpi/apirest.php/"
  private CONTENT_TYPE:string = "application/json"
  private APP_TOKEN:string = "cwU8wzJLgVnt2nGf2dcYW4pDxuunAORSkdGTYtxk"


  login(user: string, pass: string): Observable<LoginResponse> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token':this.APP_TOKEN, 'Authorization':'Basic ' + btoa(user + ":" + pass)  });
    return this._http.get<LoginResponse>( this.API_URL + "initSession/", {headers: headers} );
  }

  getSession(): Observable<SessionUser> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token':this.APP_TOKEN, 'Session-Token': this._storage.getToken()  });
    return this._http.get<SessionUser>( this.API_URL + "getFullSession", {headers: headers} );
  }

  killSession(): Observable<LoginResponse> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken() });
    return this._http.get<LoginResponse>( this.API_URL + "killSession", {headers: headers} )
  }

  getUser(id: number): Observable<UserObject> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token':this.APP_TOKEN, 'Session-Token': this._storage.getToken() });
    return this._http.get<UserObject>( this.API_URL + "user/" + id, {headers: headers} );
  }

  getAllItems(item:string): Observable<ItemObject> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    return this._http.get<ItemObject>( this.API_URL + item, {headers: headers} )
  }

  getItem(item:string, id:number): Observable<ItemObject> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    return this._http.get<ItemObject>( this.API_URL + item + "\\" + id, {headers: headers} )
  }


}