import { Routes } from '@angular/router';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {ProductosComponent} from './components/productos/productos.component';
import {HomeComponent} from './components/home/home.component';
import {PVComponent} from './components/pv/pv.component';
import {VentasComponent} from './components/ventas/ventas.component';
import {LoginComponent} from './components/login/login.component';
import {ChatComponent} from './components/chat/chat.component';
//import { AppComponent } from './app.component';

export const routes: Routes = [
        //{path: '',component: HomeComponent},
        {path: '',component: LoginComponent},
        {path: 'usuarios',component: UsuariosComponent},
        {path:'productos',component:ProductosComponent},
        {path:'pv',component:PVComponent},
        {path:'ventas',component:VentasComponent},
        {path:'login',component:LoginComponent},
        {path:'chats',component:ChatComponent}
];
