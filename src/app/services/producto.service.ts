import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //private apiUrl = 'http://localhost:3000/productos';
  //private apiUrl = 'http://192.168.1.8:3000/productos';
  private apiUrl = Global.url+'/productos';

  constructor(private http: HttpClient) {}

  // Obtener todos los Productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/todos`);
  }

  // Crear un nuevo Producto
  addProducto(Producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, Producto);
  }

  // Actualizar un Producto existente
  updateProducto(id: number, Producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, Producto);
  }

  // Actualizar Existencia De Un Producto existente
  updateExistenciaProducto(Producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}`, Producto);
  }

  // Eliminar un Producto por ID
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar un Producto por Codigo
  getProductoCodigo(codigo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/${codigo}`);
  }
}

