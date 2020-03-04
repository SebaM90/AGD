import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ItemComputer } from 'src/app/shared/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit {

  constructor(
    private _loader: LoaderService,
    private _api: ApiService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
  }

  public ticket = {
    id: 0, // Cuando se crea el reclamo, guardo el numero aca
    name: '',
    content: '',
    requesttypes_id: 7, // Request Source = APP
    urgency: 4 // Urgency = HIGH
  }

  private prueba:any;
  private qrON:boolean = false;
  private arrayItems = [];

  
  // Para volver a empezar de cero
  reiniciar() {
    this.ticket = {id: 0, name: '', content: '', requesttypes_id: 7, urgency: 4}
    this.arrayItems = [];
  }

  // Castellanizar
  spanish(texto:string) {    
    if ( texto.toLowerCase() == 'computer' ) texto = 'PC'
    //if ( texto.toLowerCase() == 'print' ) texto = 'Impresora'
    return texto
  }

  pushNewItem(newItem){
    if ( !newItem ) {
      this.qrON = false
      return;
    }
    // Primero vemos si esta duplicado o ya existe el item
    let flagDuplicate = false;
    this.arrayItems.forEach( element => {
      if ( JSON.stringify(element) == JSON.stringify(newItem) ) {
        flagDuplicate = true;
      }
    })
    // Si NO existe, lo agregamos
    if (flagDuplicate == false) this.arrayItems.push(newItem);

    this.qrON = false;
  }

  apiCreateTicket(){
    this._loader.On();
    this._api.setItem( "ticket", {input: this.ticket } ).subscribe((res) => {
      if ( this.arrayItems.length > 0 ) {
        this.apiAddItemsToTicket( res.id ); // Si NO hay elementos agregados, muestro el ticket creado.
      } else {
        this.ticket.id = res.id; // Si HAY elementos agregados, vuelvo a llamar a una API que los agrega al ticket ya creado
        this._loader.Off();
      }
    }, (err) => { this.errorHandler(err) }
    );
  }

  apiAddItemsToTicket(idTicket:number) {
    this._loader.On();
    // Preparo el contenido:
    let contenido = [];
    this.arrayItems.forEach(element => {
      contenido.push({
        tickets_id: idTicket,
        items_id: element.id,
        itemtype: element.itemType
      })
    });
    this._api.setItemToTicket( idTicket, {input: contenido} ).subscribe( (res)=> {
      this.ticket.id = idTicket;
    }, (err) => { this.errorHandler(err) },
          () => { this.completeHandler() }
    )
  }

  apiUpdateDocument(){
  }

  private errorHandler(err:any){
    alert("Hubo un error al crear el ticket.");
    console.warn(err);
    this._loader.Off();
  }

  private completeHandler(){
    this._loader.Off();
  }

}
