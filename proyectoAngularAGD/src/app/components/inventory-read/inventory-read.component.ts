import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { QRCodeRead, ItemComputer } from 'src/app/shared/interface';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-inventory-read',
  templateUrl: './inventory-read.component.html',
  styleUrls: ['./inventory-read.component.scss']
})
export class InventoryReadComponent implements OnInit {

  @Input() showTittle: boolean = true;
  @Input() showContent: boolean = true;
  @Output() outItem = new EventEmitter();

  constructor(
    private _api: ApiService,
    private _loader: LoaderService
  ) { }

  ngOnInit() {
  }

  private qrON:boolean = true;
  private item:ItemComputer;

  getQR(event:QRCodeRead):void {
    // Si recibo NULL del QR-TOOL, entonces termino, sino, sigo curso...
    ( !event ) ? this.errorHandler(null) : this.getItem( event.type, event.id )
  }

  getItem(tipoElemento:string, id:number) {
    this._loader.On()
    
    if ( !tipoElemento ) {
      this.errorHandler(null);
      return; // finalizamos
    }

    if ( typeof tipoElemento == 'undefined' || typeof id == 'undefined' ) { // Si TYPE o ID vienen vacios, evito llamar a la API
      this.errorHandler('CÓDIGO QR INVÁLIDO Ó NO ENCONTRADO EN EL INVENTARIO.');
      return; // finalizamos
    }

    this.item = null
      this._api.getItem( tipoElemento, id ).subscribe(
        (response:ItemComputer) => {
          this.item = response
          this.item.itemType = 'Computer' // ESTA PROPIEDAD LA TENGO QUE AGREGAR HARDCODEADA PORQUE EL GLPi NO ME LO INFORMA.
          //console.log(response)
          this.outItem.emit( this.item ) // Mandamos el item por el Output
        }, (err) => {
          this.errorHandler(err)
        }, () => {
          this._loader.Off()
          this.qrON = false
        }
    )
  }

  errorHandler(err:any) {
    this._loader.Off();
    if (err) alert( err );
    this.outItem.emit( null )
    this.qrON = false;
  }
}
