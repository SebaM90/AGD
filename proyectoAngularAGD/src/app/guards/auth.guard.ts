import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public _storage: StorageService,
              private router: Router,
              private _api: ApiService){}

  canActivate() {

    if ( !this._storage.isToken() ) {
      // Si NO hay token almacenado, redirijo hacia el LOGIN
        console.log('No estás logueado');
        this.router.navigate(['/login']);
        return false;
    } else {
      // Si hay TOKEN guardado, verifico que sea VALIDO, sino lo borro y redirijo
      this._api.tokenVerify().subscribe( 
        response => {return true},
        error => {
          this._storage.removeToken()
          this.router.navigate(['/login'])
          return false }
      )
    }

    return true;
}
  
}
