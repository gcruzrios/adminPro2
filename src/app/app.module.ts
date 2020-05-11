import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//RUTAS

import {APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';




import { PagesModule } from './pages/pages.module';
//import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule} from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
//import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
//import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
    //ModalUploadComponent,
    //ImagenPipe,
    //IncrementadorComponent
       
  ],
  imports: [
    BrowserModule,
    //PagesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
