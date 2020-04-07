import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { QRCodeRead, ItemComputer } from 'src/app/shared/interface';
import { LoaderService } from 'src/app/services/loader.service';
import { isArray, isObject } from 'util';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';

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
    public _loader: LoaderService
  ) { }

  ngOnInit() {
  }

  public qrON:boolean = true;
  public item:ItemComputer;

  public ticketsID:any; // Array de la busqueda de tickets por PC. Solo tengo el ID de cada TICKET
  public tickets:Array<ItemComputer>=[]; // Array de tickets completos con su contenido

  getQR(event:QRCodeRead):void {
    // Si recibo NULL del QR-TOOL, entonces termino, sino, sigo curso...
    ( !event ) ? this.errorHandler(null) : this.getItem( event.type, event.id )
  }

  public arrayDevices:ItemComputer;

  getItem(tipoElemento:string, id:number) {
    this._loader.On()
    
    if ( !tipoElemento ) {
      this.errorHandler(null);
      return; // finalizamos
    }

    this.ticketsID = []; // Array de tickets
    this.tickets = []; // Vaciamos / Reinicializamos

    if ( typeof tipoElemento == 'undefined' || typeof id == 'undefined' ) { // Si TYPE o ID vienen vacios, evito llamar a la API
      this.errorHandler('CÓDIGO QR INVÁLIDO Ó NO ENCONTRADO EN EL INVENTARIO.');
      return; // finalizamos
    }

    this.item = null
      this._api.getItem( tipoElemento, id, { get_hateoas: 'false', with_devices: 'true', with_disks: 'true' } ).subscribe(
        (response:ItemComputer) => {
          this.item = response
          this.item.itemType = 'Computer' // ESTA PROPIEDAD LA TENGO QUE AGREGAR HARDCODEADA PORQUE EL GLPi NO ME LO INFORMA.

          this.arrayDevices = response

          let obsMemories:Array<any>=[] // Array de observables
          let obsProcessors:Array<any>=[] // Array de observables
          let obsFirmwares:Array<any>=[] // Array de observables
          let obsHardDrives:Array<any>=[] // Array de observables

          if (response) {
            obsMemories = this.obtainArrayOfObservable( response, 'Item_DeviceMemory', 'devicememories_id', 'DeviceMemory' )
            obsProcessors = this.obtainArrayOfObservable( response, 'Item_DeviceProcessor', 'deviceprocessors_id', 'DeviceProcessor' )
            obsFirmwares = this.obtainArrayOfObservable( response, 'Item_DeviceFirmware', 'devicefirmwares_id', 'DeviceFirmware' )
            obsHardDrives = this.obtainArrayOfObservable( response, 'Item_DeviceHardDrive', 'deviceharddrives_id', 'DeviceHardDrive' )

            forkJoin( obsMemories ).subscribe( res => this.addAPIresponse(response,res,'Item_DeviceMemory') )
            forkJoin( obsProcessors ).subscribe( res => this.addAPIresponse(response,res,'Item_DeviceProcessor') )
            forkJoin( obsFirmwares ).subscribe( res => this.addAPIresponse(response,res,'Item_DeviceFirmware') )
            forkJoin( obsHardDrives ).subscribe( res => this.addAPIresponse(response,res,'Item_DeviceHardDrive') )
          }

          this.outItem.emit( this.item ) // Mandamos el item por el Output
        }, (err) => {
          this.errorHandler(err)
        }, () => {
          this._loader.Off()
          this.qrON = false
          console.log(this.arrayDevices)
        }
    )
  }

  obtainArrayOfObservable( response, item_:string, device:string, apiItem:string ):Array<any>{
    let obsSubItems:Array<any>=[] // Array de observables (de subitems, ejemplo; cada subitem seria un modulo de memoria ram)
    let objPropNames = Object.keys( response._devices[item_] )
    objPropNames.forEach( key => {
      let id = response._devices[item_][key][device]
      obsSubItems.push( this._api.getItem(apiItem, id) )
    })
    return obsSubItems // devuelvo un array con observables
  }

  // Por cada item le agrego lo que me responde la API
  addAPIresponse(response, toBeAdded, item:string) {
    let c:number = 0;
    _.each( response._devices[item], (value, key) => {
      response._devices[item][key]['API'] = toBeAdded[c]
      c++
    })
  }

  getTicketsFromComputer() {
    this._loader.On()
    this._api.getAllTiketsFromComputer( this.item.itemType, this.item.id, { get_hateoas: 'false', sort: 'tickets_id', order: 'desc' } ).subscribe(res => {
      
        this.ticketsID = res; // Array de tickets
        this.tickets = []; // Vaciamos / Reinicializamos
        let cantErrors:number = 0; // Flag para saber si aparece al menos un error, y evitar tirar mil alerts

        // 2º LLAMADO API: Ahora consulto a la API por cada uno de los ticket_id, asi obtengo el contenido de cada ticket
        this.ticketsID.forEach(element => {
          if (element.tickets_id > 0) {
            this._loader.On()
            this._api.getItem('ticket', element.tickets_id).subscribe(r => {
              this.tickets.push( r )
            }, (err) => {
              if (cantErrors==0) {
                this.errorHandler(err)
              } else {
                this.errorHandler(null)
              }
              cantErrors++ // CUANDO APARECE EL PRIMER ERROR, LE AVISO AL FLAG PARA QUE EL PROXIMO ERROR ASINCRONO NO TIRE OTRO ALERT
            }, () => {
              this._loader.Off()
            })
          }
        });
        // ================================================================================================================

    }, (err) => {
      this.errorHandler(err)
    }, () => {
      this._loader.Off()
    })
  }

  errorHandler(err:any) {
    this._loader.Off();
    if (err) {
      isObject(err) ? alert( err.error[0] + ': ' + err.error[1] ) : alert( err ) ;
    };
    console.log(err)
    this.outItem.emit( null )
    this.qrON = false;
  }
}
