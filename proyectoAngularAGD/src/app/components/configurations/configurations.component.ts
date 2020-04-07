import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  constructor( public _storage: StorageService ) { }

  ngOnInit() {
    this.phone_cel = parseInt( this.get() );
  }

  protected KEY_CEL:string = 'agd-config-celular';
  public phone_cel:number;

  set(){

    // VALIDATION: Si supera los 15 caracteres, corto el string
    if ( this.phone_cel.toString().length > 15 ) this.phone_cel = parseInt(this.phone_cel.toString().slice(0, 15));

    this._storage.setValue( this.KEY_CEL, this.phone_cel.toString() )

  }

  get(){
    return this._storage.getValue( this.KEY_CEL )
  }

  clean(){
    this.phone_cel = undefined
    this._storage.setValue( this.KEY_CEL, '' )
  }

}
