import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = Global.url+'/chats';

  constructor(private http: HttpClient) { }

  // Buscar Chats Emisor Y Receptor
  getChats(idemisor:number,idreceptor:number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/${idemisor}/${idreceptor}`);
  }

  // Buscar Chats Emisor Y Receptor Nombres
  getChatsNombres(idemisor:number,idreceptor:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombres/${idemisor}/${idreceptor}`);
  }

  //Insertar Chats
  addChat(Chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.apiUrl, Chat);
  }
}
