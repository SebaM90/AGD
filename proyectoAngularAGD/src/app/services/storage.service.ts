import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  protected PUBLIC_KEY:string = '<AA48o*+9)kPvZeA$D;Dvws%)soD}R';
  private keyStorageToken = 'agd-user-token';
  private keyStorageUser = 'agd-user';
  private keyStoragePass = 'agd-pass';

  private encrypt(value:string){
    return CryptoJS.AES.encrypt( value, this.PUBLIC_KEY )
  }

  private decrypt(value:string){
    let bytes = '';
    if (value) { bytes  = CryptoJS.AES.decrypt( value, this.PUBLIC_KEY ).toString( CryptoJS.enc.Utf8 ) || '' };
    return bytes;
  }

  private getData(key:string){
    let aux = localStorage.getItem( key ) || ""
    return this.decrypt(aux)
  }

  private setData(key:string, data: string){    
    localStorage.setItem( key, this.encrypt(data) )
  }

  private removeData(key:string){
    localStorage.removeItem( key )
  }

  isToken():boolean{
    if (typeof this.getToken() === "undefined") {
      return false
    } else { 
      return this.getToken().length > 0 ? true : false
    }
  }

  getToken(){    return this.getData(this.keyStorageToken)  }

  getSavedUser() {
    if (typeof this.getData(this.keyStorageUser) === 'undefined') {
      return '';
    } else{
      return this.getData(this.keyStorageUser)
    }
  }

  getSavedPass() {
    if (typeof this.getData(this.keyStoragePass) === 'undefined') {
      return '';
    } else{
      return this.getData(this.keyStoragePass);
    }
  }

  setToken(data:string){    this.setData(this.keyStorageToken, data)  }
  setSavedUser(data:string){    this.setData(this.keyStorageUser, data)  }
  setSavedPass(data:string){    this.setData(this.keyStoragePass, data)  }

  removeToken(){    this.removeData(this.keyStorageToken)  }
  removeSavedUser(){    this.removeData(this.keyStorageUser)  }
  removeSavedPass(){    this.removeData(this.keyStoragePass)  }

  removeALL(){    localStorage.clear();  }

}
