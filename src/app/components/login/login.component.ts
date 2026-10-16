import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  usuarios: Usuario[] = [];
  usuario: Usuario = { nombre: '',contrasena:'', email: '',fecha_nacimiento: new Date("2025-05-31"),signo: '' };

  constructor(private usuarioService: UsuarioService) {}

  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {
  }
  contrasena:string="";
  nombre:string="";
  //ingreso:boolean=false;
  getLogin():void{
    this.usuarioService.getLogin(this.nombre,this.contrasena).subscribe(data=>{
      this.usuarios=data;
      if(this.usuarios.length!=0){
        alert("Bienvenido Usuario "+this.nombre);
      }
      else{
        alert("Usuario No Encontrado");
      }
    })
  }
}

