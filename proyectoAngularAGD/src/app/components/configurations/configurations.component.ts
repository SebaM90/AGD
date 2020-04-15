import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  constructor( public _storage: StorageService,
               public router: Router
            ) {}

  ngOnInit() {
    this.phone_cel = parseInt( this.get( this.KEY_CEL ) );
    this.user_name = this.get( this.KEY_USER_NAME );
  }

  public msgListo:boolean = false

  public KEY_CEL:string = 'agd-config-celular';
  public KEY_USER_NAME:string = 'agd-config-username';
  public phone_cel:number;
  public user_name:string;

  validateCel(){
    // VALIDATION: Si supera los 15 caracteres, corto el string
    if ( this.phone_cel.toString().length > 15 ) this.phone_cel = parseInt(this.phone_cel.toString().slice(0, 15));
  }

  set( key:string, value:string ){    this._storage.setValue( key, value )  }

  get( key:string ){  return this._storage.getValue( key )  }

  clean(key:string ){
    this._storage.removeValue(key)
    this.ngOnInit()
  }

  setAll(){

    if (this.phone_cel>0) {
      this.set( this.KEY_CEL, this.phone_cel.toString() )
    } else {
      this.clean( this.KEY_CEL )
    }

    if (this.user_name.length>0) {
      this.set( this.KEY_USER_NAME, this.user_name )
    } else {
      this.clean( this.KEY_USER_NAME )
    }

    if ( this.phone_cel>0 || this.user_name.length>0 ) {
      this.msgListo = true
      timer(2000).subscribe( () => { 
        this.router.navigate(['/reclamos/nuevo']); // DELAY / RETRASO ANTES DE RE-DIRIGIR A LA PAGINA DE NUEVOS RECLAMOS
      })
    } else {
      alert("Nada que guardar")
    }

  }

}
