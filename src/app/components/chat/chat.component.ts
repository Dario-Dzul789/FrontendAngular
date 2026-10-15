import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  usuarios: Usuario[] = [];
  usuario: Usuario = { nombre: '',contrasena:'', email: '',fecha_nacimiento: new Date("2025-05-31"),signo: '' };
  chats:Chat[] = [];
  chat:Chat={id:0, idemisor:0,mensaje:'', idreceptor:0};
  todosChats: any[] = [];

  constructor(private usuarioService: UsuarioService,private chatService:ChatService) {}

  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {
    this.getUsuarios();
  }
  // CARGAR USUARIOS DESDE EL BACKEND
  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }
  idemisor:number=0;
  idreceptor:number=0;
  mensaje:string="";
  addChats(): void {
    this.chat.id=0;
    this.chat.idemisor=this.idemisor;
    this.chat.mensaje=this.mensaje;
    this.chat.idreceptor=this.idreceptor;
    this.chatService.addChat(this.chat).subscribe(() => {
    });
    this.getChatsNombres();
    this.resetFormulario();
    this.getChatsNombres();
  }
  getChats(): void {
    this.chatService.getChats(this.idemisor,this.idreceptor).subscribe(data=>{
      this.chats=data;
    })
  }
  getChatsNombres(): void {
    this.chatService.getChatsNombres(this.idemisor,this.idreceptor).subscribe(data=>{
      this.todosChats=data;
    })
  }

  resetFormulario(): void {
    this.usuario = { nombre: '', contrasena:'', email: '',fecha_nacimiento: new Date("2025-05-31"),signo: '' };
    this.chat={id:0, idemisor:0,mensaje:'', idreceptor:0};
    this.mensaje="";
  }

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  capturarId(e:any): void {
    this.idreceptor=e.target.value;
    this.getChatsNombres();
    //alert(this.idreceptor);
  }
}
