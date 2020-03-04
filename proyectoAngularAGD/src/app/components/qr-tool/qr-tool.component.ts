import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-qr-tool',
  templateUrl: './qr-tool.component.html',
  styleUrls: ['./qr-tool.component.scss']
})

export class QrToolComponent implements OnInit {

  @Input() switchedOn:boolean = false;
  @Output() qrReadResult = new EventEmitter();

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  constructor(
    private _api: ApiService
  ) {}

  public widthViewport:number = 10
  public lectura:string = ""

  ngOnInit() {
    this.widthViewport = screen.width * 0.85

    // HARDCODE ================================================================================================================
    // let aleatorio = Math.floor(Math.random() * (90 - 2)) + 2; // HARDCODE HARDCODE HARDCODE HARDCODE
    // this.qrReadResult.emit( this.convertQRtoJSON("TYPE=Computer\r\nID="+aleatorio) ); // HARDCODE HARDCODE HARDCODE HARDCODE
    // HARDCODE ================================================================================================================
  }

  outputLectura(ev:string) {
    (!ev) ? this.qrReadResult.emit( null ) : this.qrReadResult.emit( this.convertQRtoJSON(ev) );
    window.navigator.vibrate(200);
    this.switchedOn = false;
  }
  
  convertQRtoJSON(val:string) {
    let objResult = {};
    let serialized = val.split('\r\n').map( (e,index) => {
      let clave = e.split('=')[0].toLocaleLowerCase();
      let valor = e.split('=')[1];
      objResult[clave] = valor;
    });
    return objResult
  }

     //hijodeputa:string
     allCameras:Array<any> // Alamaceno todos los devices(camaras) reconocidos por el plugin
  currentCamera:number = 0  // Almaceno la camara seleccionada actual

  camerasFoundHandler(event){
    this.allCameras = event
    this.currentCamera = this.allCameras.length-1
    // let aux2 = []
    // let aux = event.map( obj => aux2.push(obj.label) );
    // this.hijodeputa = JSON.stringify(aux2) + "\n"
  }

  // Cambiar la camara actual, puede haber mas de 2
  toggleCamera() {
    (this.currentCamera >= this.allCameras.length-1) ? this.currentCamera = 0: this.currentCamera++

    this.scanner.device = this.allCameras[ this.currentCamera ]
  }

}
