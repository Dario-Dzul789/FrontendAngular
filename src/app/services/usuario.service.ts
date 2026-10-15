import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  //private apiUrl = 'http://localhost:3000/usuarios';
  //private apiUrl = 'http://192.168.1.8:3000/usuarios';
  private apiUrl = Global.url+'/usuarios';

  //private apiUrl = RutaBD.nombre+ '/usuarios';

  constructor(private http: HttpClient) {}

  // Buscar Login
  getLogin(nombre:string,contrasena:string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/login/${nombre}/${contrasena}`);
  }


  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Crear un nuevo usuario
  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);  
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
