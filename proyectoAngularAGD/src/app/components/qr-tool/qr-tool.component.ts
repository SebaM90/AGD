import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { LoginResponse, ItemObject } from 'src/app/shared/interface';

import { QrCodeAllModule } from 'ngx-qrcode-all';


@Component({
  selector: 'app-qr-tool',
  templateUrl: './qr-tool.component.html',
  styleUrls: ['./qr-tool.component.scss']
})

export class QrToolComponent implements OnInit {

  @Input() switchedOn:boolean;

  constructor(
    private _api: ApiService
  ) {}

  public widthViewport:number = 10
  public token:string
  public lectura:string = ""

  ngOnInit() {
    this.widthViewport = screen.width * 0.8
  }

  captureImage(ev:string) {
    this.getItem( ev );
  }
  
  getItem(ev:string) {
    let tipoElemento = this.getQRfield(ev,'TYPE');
    let id = parseInt( this.getQRfield(ev,'ID') );
    this._api.getItem( tipoElemento, id ).subscribe(
      (response:any) => {
        this.lectura = "NOMBRE: " + response.name;
      }, (err) => {
        this.errorHandler(err)
      }
    )
  }

  getQRfield(readQR:string, field:string) {
    let objResult = {};
    let serialized = readQR.split('\r\n').map( (e,index) => {
      let clave = e.split('=')[0];
      let valor = e.split('=')[1];
      objResult[clave] =valor;
    });
    return objResult[field]
  }

  errorHandler(err:any){
    alert(err);
  }

}
