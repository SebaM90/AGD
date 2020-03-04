import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ApiService } from 'src/app/services/api.service';
import { ItemComputer } from 'src/app/shared/interface';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})
export class InventoryViewComponent implements OnInit {

  constructor(
    private _loader: LoaderService,
    private _api: ApiService
  ) {}

  ngOnInit() {
    this.getAlltickets()
  }

  private inventory:ItemComputer

  getAlltickets() {
    this._loader.On()
    this._api.getAllItems('computer',{}).subscribe( (result:any)=>{
      this.inventory = result.filter( item => item.status <= 4 )
    }, (err) => { console.log(err) },
        ()=> { this._loader.Off() });
  }


}
