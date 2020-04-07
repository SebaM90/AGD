import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ItemComputer } from 'src/app/shared/interface';
import { StorageService } from 'src/app/services/storage.service';
import * as $AB from 'jquery';

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.scss']
})
export class TicketsViewComponent implements OnInit {

  constructor(
    public _loader: LoaderService,
    private _api: ApiService,
    public _storage: StorageService
  ) {}

  ngOnInit() {
    this.getTicketsAccordingCheckbox()
  }

  p: number
  public tickets:any
  public cantVer:number = 20
  private condicionTickets = [1,2,3,4]
                          // ESTADOS DE LOS TICKETS
                          // 2 → Processing (assigned)
                          // 4 → Pending
                          // 5 → Solved
                          // 6 → Closed

  checkbox(){
    if ( (<any>$('.ui.checkbox')).checkbox("is checked") ) {
      //this.condicionTickets = [4,5];
      this.getTicketsClosed();
    } else {
      this.getTicketsOpened();
      //this.condicionTickets = [0,1,2,3,4];
      //this.condicionTickets.filter(item => item != 5);
    }
    //console.log(this.condicionTickets)
  }

  // isStatusOnArray(buscado:number):boolean {
  //   const data = [1, 2, 3, 4, 5];   ​
  //   let found = this.condicionTickets.find(element => element == buscado);
  //     if (typeof found == 'undefined') {
  //       return false;
  //     } else {
  //       return true;
  //     }
  // }

  // getAlltickets() {
  //   this._loader.On()
  //   this._api.getAllItems('ticket', { get_hateoas: 'false', sort: 'id', order: 'desc', range: '0-' + this.cantVer } ).subscribe( (result:any)=>{
  //     this.tickets = result.filter( item => item.status <= 6 )
  //     //console.log(this.tickets)
  //   }, (err) => { console.log(err) },
  //           ()=> { this._loader.Off() });
  // }

  getTicketsAccordingCheckbox() {
    if ( (<any>$('.ui.checkbox')).checkbox("is checked") ) {
      this.getTicketsClosed();
    } else {
      this.getTicketsOpened();
    }
  }

  getTicketsOpened() {
    this._loader.On()
    this._api.getAllItems('ticket', { get_hateoas: 'false', sort: 'id', order: 'desc', range: '0-' + this.cantVer } ).subscribe( (result:any)=>{
      this.tickets = result.filter( item => item.status <= 4 )
      //console.log(this.tickets)
    }, (err) => { console.log(err) },
            ()=> { this._loader.Off() });
  }

  getTicketsClosed() {
    this._loader.On()
    this._api.getAllItems('ticket', { get_hateoas: 'false', sort: 'id', order: 'desc', range: '0-' + this.cantVer } ).subscribe( (result:any)=>{
      this.tickets = result.filter( item => item.status >= 5 )
      //console.log(this.tickets)
    }, (err) => { console.log(err) },
            ()=> { this._loader.Off() });
  }

}
