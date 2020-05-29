import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from 'src/app/services/storage.service';
import { LoginResponse, Search, ItemComputer, UserObject, SessionUser } from '../shared/interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public currentUser:Observable<SessionUser>;

  constructor(
    public _storage: StorageService,
    private _http: HttpClient
  ) {}

  //private API_URL: string = "https://ping.webhop.org:8889/glpi/apirest.php/"
  private API_URL: string = "/glpi/apirest.php/"
  private CONTENT_TYPE:string = "application/json"
  private APP_TOKEN:string = "cwU8wzJLgVnt2nGf2dcYW4pDxuunAORSkdGTYtxk"

  tokenVerify(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token':this.APP_TOKEN, 'Session-Token': this._storage.getToken()  });
    return this._http.get( this.API_URL + "getActiveProfile", {headers: headers} )
  }

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

  getAllItems(item:string, parameters:any): Observable<ItemComputer> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    let params = new HttpParams({ fromObject: parameters });
    return this._http.get<ItemComputer>( this.API_URL + item, {headers: headers, params: params} )
  }

  getItem(item:string, id:number, parameters:any={}): Observable<ItemComputer> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    let params = new HttpParams({ fromObject: parameters });
    return this._http.get<ItemComputer>( this.API_URL + item + "\\" + id, {headers: headers, params: params} )
  }

  // Obtener ID (y otras datos menos importantes) de un item mediante el numero de inventario (Fussion Inventory)
  getIdItemByInventory(item:string, inventory:string, parameters:any={}): Observable<Search> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    parameters = {
           'criteria[0][field]': 6,
      'criteria[0][searchtype]': 'equals',
           'criteria[0][value]': inventory,
              'forcedisplay[0]': 2,
    };
    let params = new HttpParams({ fromObject: parameters });
    return this._http.get<Search>( this.API_URL + "search\\" + item, {headers: headers, params: params} )
  }

  // Traer todas los TASK (seguimientos, intervenciones, soluciones) de los TICKETS
  getAllTasksFromTicket(id:number, parameters:any): Observable<ItemComputer> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    let params = new HttpParams({ fromObject: parameters });
    return this._http.get<ItemComputer>( this.API_URL + "ticket\\" + id + "\\TicketTask", {headers: headers, params: params} )
  }

  // Traer todos los TICKETS que tienen una determinada COMPUTER
  getAllTiketsFromComputer(item:string, id:number, parameters:any): Observable<ItemComputer> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    let params = new HttpParams({ fromObject: parameters });
    return this._http.get<ItemComputer>( this.API_URL + item + "\\" + id + "\\Item_Ticket", {headers: headers, params: params} )
  }


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------- SETTERS ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

  setItem(item:string, content:object): Observable<ItemComputer> {
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    return this._http.post<ItemComputer>( this.API_URL + item, content, {headers: headers} )
  }

  setItemToTicket(id:number, content:object ){
    let headers = new HttpHeaders({ 'Content-Type': this.CONTENT_TYPE, 'App-Token': this.APP_TOKEN, 'Session-Token': this._storage.getToken()});
    return this._http.post<ItemComputer>( this.API_URL + 'ticket/' + id + '/item_ticket', content, {headers: headers} )
  }


}