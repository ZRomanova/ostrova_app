import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrComponent } from './components/auth/registr/registr.component';
import { MenuComponent } from './components/menu/menu.component';
import { TokenInterceptor } from './classes/token.interceptor';
import { FilesListComponent } from './components/files-list/files-list.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    LoginComponent,
    RegistrComponent,
    MenuComponent,
    FilesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
