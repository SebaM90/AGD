import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard'

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { QrToolComponent } from './components/qr-tool/qr-tool.component';

import { QrCodeAllModule } from 'ngx-qrcode-all';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // https://www.npmjs.com/package/@zxing/ngx-scanner

import { NotFoundComponent } from './components/not-found/not-found.component';
import { InventoryReadComponent } from './components/inventory-read/inventory-read.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketsViewComponent } from './components/tickets-view/tickets-view.component';
import { EntidadesHtmlPipe } from './pipes/entidades-html.pipe';
import { InventoryViewComponent } from './components/inventory-view/inventory-view.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

// Rutas
const rutas: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reclamos/nuevo', component: TicketNewComponent, canActivate: [AuthGuard] },
  { path: 'reclamos/ver', component: TicketsViewComponent, canActivate: [AuthGuard] },
  { path: 'inventario/escanear', component: InventoryReadComponent, canActivate: [AuthGuard] },
  { path: 'inventario/ver', component: InventoryViewComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'error' },
  { path: 'error', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrToolComponent,
    NotFoundComponent,
    InventoryReadComponent,
    TicketNewComponent,
    TicketsViewComponent,
    EntidadesHtmlPipe,
    InventoryViewComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    AppRoutingModule,
    QrCodeAllModule,
    ZXingScannerModule,
    NgxPaginationModule
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
