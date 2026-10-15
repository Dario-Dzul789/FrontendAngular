import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../models/venta';
import { Ventasdetalles } from '../models/ventasdetalles';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VentasdetallesService {
  private apiUrl = Global.url+'/ventasdetalles';

  constructor(private http: HttpClient) {
   }

  //Insertar VentasDetalles
  addVentadetalles(Ventasdetalles: Ventasdetalles): Observable<Ventasdetalles> {
    return this.http.post<Ventasdetalles>(this.apiUrl, Ventasdetalles);
  }

  // Buscar VentasDetalles Por ID Ventas
  getVentasDetallesXIdVentas(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
