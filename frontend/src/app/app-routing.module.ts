import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './classes/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrComponent } from './components/auth/registr/registr.component';
import { FilesListComponent } from './components/files-list/files-list.component';

const routes: Routes = [
  {path: '', component: MenuComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: '/files', pathMatch: 'full'},
    {path: 'upload', component: UploadFormComponent},
    {path: 'files', component: FilesListComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
