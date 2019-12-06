import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { QrToolComponent } from './components/qr-tool/qr-tool.component';

import { QrCodeAllModule } from 'ngx-qrcode-all';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InventoryReadComponent } from './components/inventory-read/inventory-read.component';

// Rutas
const rutas: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'qr', component: QrToolComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrToolComponent,
    NotFoundComponent,
    InventoryReadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    AppRoutingModule,
    QrCodeAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
