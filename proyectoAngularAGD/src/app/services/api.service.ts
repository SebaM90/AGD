import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse, ItemObject } from '../shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  private API_URL: string = "/glpi/apirest.php/"
  private CONTENT_TYPE:string = "application/json"
  private APP_TOKEN:string = "cwU8wzJLgVnt2nGf2dcYW4pDxuunAORSkdGTYtxk"

  login(user: string, pass: string): Observable<LoginResponse> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token':this.APP_TOKEN, 'Authorization':'Basic ' + btoa(user + ":" + pass)  });
    return this._http.get<LoginResponse>( this.API_URL + "initSession", {headers: headers} )
  }

  killSession(token:string): Observable<LoginResponse> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': token  });
    return this._http.get<LoginResponse>( this.API_URL + "killSession", {headers: headers} )
  }

  getAllItems(token:string, item:string): Observable<ItemObject> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': token });
    return this._http.get<ItemObject>( this.API_URL + item, {headers: headers} )
  }
}
