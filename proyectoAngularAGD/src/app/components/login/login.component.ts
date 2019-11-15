import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { LoginResponse, ItemObject } from 'src/app/shared/interface';
import { User } from 'src/app/shared/model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuarioActual: User = new User();

  constructor(
    private _user: UserService,
    private _api: ApiService,
  ) { }

  ngOnInit() {}

  allItems:any = [];

  btnLogin(){
    const user = (document.querySelector("#user") as HTMLInputElement).value
    const pass = (document.querySelector("#pass") as HTMLInputElement).value

    this._api.login(user, pass).subscribe( (response:LoginResponse) => {
      this.usuarioActual.user = user
      this.usuarioActual.token = response.session_token
    })
  }

  btnCloseSession(){
    this._api.killSession( this.usuarioActual.token ).subscribe( (response:LoginResponse) => {
      this.usuarioActual.user = ""
      this.usuarioActual.token = ""
      this.allItems = []
    })
  }

  btnGetAllItems(tipoElemento:string){
    this._api.getAllItems( this.usuarioActual.token, tipoElemento).subscribe( (response:ItemObject) => {
      this.allItems = response
    })

  }
}
