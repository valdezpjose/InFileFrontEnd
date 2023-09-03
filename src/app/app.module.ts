import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables'
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeDialogComponent } from './component/mensaje-dialog/mensaje-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormUsuarioComponent,
    ReporteComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    MensajeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
