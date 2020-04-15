import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { SidenavService } from './services/sidenav.service';
import { LoaderService } from './services/loader.service';
import { Meta } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

// COVID19
import { NovelCovid } from 'novelcovid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loadingData: boolean = false;
  private logged:boolean = false

  // COVID19
  public covid19: any;

  title = 'proyectoAngularAGD';

  constructor(
    private meta: Meta,
    private router: Router,
    public _loader: LoaderService,
    private _api: ApiService,
    public _storage: StorageService,
    public _sidenav: SidenavService
  ) {

    this.meta.addTag({ name: 'google', content: 'notranslate' }); // META TAG PARA QUE GOOGLE NO QUIERA TRADUCIR

    this.logged = this._storage.isToken();

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._sidenav.close();
      }
    })

    const track = new NovelCovid();
    track.countries('Argentina').then( res => { this.covid19 = res; console.log(res) })
  }

  coronavirus(){
      window.open('https://www.worldometers.info/coronavirus/country/argentina/')
  }

  ngOnInit() {
    this._sidenav.effects();
    const sn = this._sidenav

    // HAMMERJS GESTO SWIPE RIGHT SOBRE EL BODY PARA ABRIR MENU ------------------
    var hammertime = new Hammer(document.querySelector("body"), {});
    hammertime.on('swiperight', function(event) {
      sn.toggle();
    });
    // ----------------------------------------------------------------------------


    // HAMMERJS GESTO SWIPE LEFT SOBRE EL MENU PARA CERRAR A ÉL MISMO -------------
    var hammertime = new Hammer(document.querySelector("#idMenuLateral"), {});
    hammertime.on('swipeleft', function(event) {
      sn.close();
    });
    // ----------------------------------------------------------------------------

  }

  closeSession() {
    if ( confirm("¿Esta seguro?") ) {
      this._loader.On();
      this._api.killSession().subscribe(
        (res) => {
          this._storage.removeToken();
          this._sidenav.close();
        },
        (error) => {
          this.errorHandler(error)
        },
        () => {
          this.router.navigate(['/login']);
          this._loader.Off();
        }
      )
    }
  }

  errorHandler(err:any) {
    alert("Error Cerrando Sesión")
    this.router.navigate(['/login']);
    this._loader.Off();
    console.warn(err)
  }
}