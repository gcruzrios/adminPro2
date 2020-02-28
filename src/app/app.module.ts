import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//RUTAS

import {APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';




import { PagesModule } from './pages/pages.module';
//import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ServiceModule} from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    //IncrementadorComponent
       
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
