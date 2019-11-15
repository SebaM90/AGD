import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  // api_url: string = ""

  login(user: string, pass: string): Observable<LoginResponse> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
         'App-Token':'cwU8wzJLgVnt2nGf2dcYW4pDxuunAORSkdGTYtxk',
     'Authorization':'Basic ' + btoa(user + ":" + pass)
     });
    return this._http.get<LoginResponse>("/glpi/apirest.php/initSession", {headers: headers})
  }
}
