import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  //private apiUrl = 'http://localhost:3000/ventas';
  //private apiUrl = 'http://192.168.1.8:3000/productos';
  private apiUrl = Global.url+'/ventas';


  constructor(private http: HttpClient) { }

  // Buscar Venta Por Fechas
  getVentaPorFechas(inicio:Date,fin:Date): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/fechas/${inicio}/${fin}`);
  }

  //Insertar Ventas
  addVenta(Venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, Venta);
  }
}
