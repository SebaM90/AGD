import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { LoginResponse } from 'src/app/shared/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _api: ApiService
  ) { }

  ngOnInit() {
  }

  btnLogin(){
    const user = (document.querySelector("#user") as HTMLInputElement).value
    const pass = (document.querySelector("#pass") as HTMLInputElement).value

    this._api.login(user, pass).subscribe( (response:LoginResponse) => {
      console.log( response );
    })
  }
}
