import { Component, OnInit } from '@angular/core';
//import { CommonModule, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = { nombre: '',contrasena:'', email: '',fecha_nacimiento: new Date(),signo: ''};
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private usuarioService: UsuarioService) {
    
  }

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
  signoAsignar:string="Vacio";
  dia:number=0;
  diaTexto:string="";
  mes:number=0;
  mesTexto:string="";
  anio:number=0;
  anioTexto:string="";

  Incio:Date=new Date("2025-05-31");
  FechaInicio:string="";
  Fin:Date=new Date("2025-05-31");
  FN:Date=new Date("2025-05-31");
  FechaFinal:string="";
  metodo2(){
    const d4 = new Date(this.usuario.fecha_nacimiento).toISOString();
    const d5 =d4.split('-')[0];
    const d7 =d4.split('-')[1];
    const d8 =d4.split('-')[2];
    const d9 =d8.split('T')[0];
    this.anioTexto=d5;
    this.mesTexto=d7;
    this.diaTexto=d9;
    this.anio=parseInt(this.anioTexto);
    this.mes=parseInt(this.mesTexto);
    this.dia=parseInt(this.diaTexto);
    //alert("anio"+this.anioTexto+" Mes "+this.mesTexto+" Dia Texto "+this.diaTexto);
    /*
    Aries: 21 de marzo al 19 de abril
    Tauro: 20 de abril y al 20 de mayo
    Géminis: 21 de mayo al 20 de junio
    Cáncer: 21 de junio al 22 de julio
    Leo: 23 de julio al 22 de agosto
    Virgo: 23 de agosto al 22 de septiembre
    Libra: 23 de septiembre al 22 de octubre
    Escorpio: 23 de octubre al 21 de noviembre
    Sagitario: 22 de noviembre al 21 de diciembre
    Capricornio: 22 de diciembre al 19 de enero
    Acuario: 20 de enero al 18 de febrero
    Piscis: 19 de febrero al 20 de marzo
    */
    if((this.mes==1 && this.dia>=20 &&this.dia<=31)|| (this.mes==2 && this.dia>=1 &&this.dia<=18)){
      this.signoAsignar="Acuario";
    }
    if((this.mes==2 && this.dia>=19 &&this.dia<=31)|| (this.mes==3 && this.dia>=1 &&this.dia<=20)){
      this.signoAsignar="Piscis";
    }
    if((this.mes==3 && this.dia>=21 &&this.dia<=31)|| (this.mes==4 && this.dia>=1 &&this.dia<=19)){
      this.signoAsignar="Aries";
    }
    if((this.mes==4 && this.dia>=20 &&this.dia<=31)|| (this.mes==5 && this.dia>=1 &&this.dia<=20)){
      this.signoAsignar="Tauro";
    }
    if((this.mes==5 && this.dia>=21 &&this.dia<=31)|| (this.mes==6 && this.dia>=1 &&this.dia<=20)){
      this.signoAsignar="Géminis";
    }
    if((this.mes==6 && this.dia>=21 &&this.dia<=31)|| (this.mes==7 && this.dia>=1 &&this.dia<=22)){
      this.signoAsignar="Cáncer";
    }
    if((this.mes==7 && this.dia>=23 &&this.dia<=31)|| (this.mes==8 && this.dia>=1 &&this.dia<=22)){
      this.signoAsignar="Leo";
    }
    if((this.mes==8 && this.dia>=23 &&this.dia<=31)|| (this.mes==9 && this.dia>=1 &&this.dia<=22)){
      this.signoAsignar="Virgo";
    }
    if((this.mes==9 && this.dia>=23 &&this.dia<=31)|| (this.mes==10 && this.dia>=1 &&this.dia<=22)){
      this.signoAsignar="Libra";
    }
    if((this.mes==10 && this.dia>=23 &&this.dia<=31)|| (this.mes==11 && this.dia>=1 &&this.dia<=21)){
      this.signoAsignar="Escorpio";
    }
    if((this.mes==11 && this.dia>=22 &&this.dia<=31)|| (this.mes==12 && this.dia>=1 &&this.dia<=21)){
      this.signoAsignar="Sagitario";
    }
    if((this.mes==12 && this.dia>=22 &&this.dia<=31)|| (this.mes==1 && this.dia>=1 &&this.dia<=19)){
      this.signoAsignar="Capricornio";
    }
    //alert(this.signoAsignar);
    this.usuario.signo=this.signoAsignar;
    
  }
  metodo4(){
    this.usuario.fecha_nacimiento=new Date(Date.UTC(2025,10,20,0,0,0,0));
  }
  metodo(){
    //const d2 = new Date(this.usuario.fecha_nacimiento).getDate();
    //const d3 = new Date(this.usuario.fecha_nacimiento).getMonth();
    const d4 = new Date(this.usuario.fecha_nacimiento).toISOString();
    this.anioTexto=d4[0]+d4[1]+d4[2]+d4[3];
    this.mesTexto=d4[5]+d4[6];
    this.diaTexto=d4[8]+d4[9];
    this.anio=parseInt(this.anioTexto);
    this.mes=parseInt(this.mesTexto);
    this.dia=parseInt(this.diaTexto);
    //this.Incio.setFullYear(this.anio);
    //this.Incio.setMonth(2);
    //this.Incio.setDate(20);
    //this.FechaInicio=this.anioTexto+"-20-01";
    //const IncioA:Date=new Date("2025-20-01");
    this.Incio=new Date(Date.UTC(this.anio,0,20,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,1,18,23,59,59,999));
    this.FN=new Date(Date.UTC(this.anio,this.mes-1,this.dia,1,0,0,0));
    

    
    
    
    //alert(this.usuario.fecha_nacimiento);
    //alert(this.mesTexto);
    //alert(this.diaTexto);
    //alert(this.mes);
    //alert(this.dia);
    //alert(this.anio);
    /*
    Aries: 21 de marzo al 19 de abril
    Tauro: 20 de abril y al 20 de mayo
    Géminis: 21 de mayo al 20 de junio
    Cáncer: 21 de junio al 22 de julio
    Leo: 23 de julio al 22 de agosto
    Virgo: 23 de agosto al 22 de septiembre
    Libra: 23 de septiembre al 22 de octubre
    Escorpio: 23 de octubre al 21 de noviembre
    Sagitario: 22 de noviembre al 21 de diciembre
    Capricornio: 22 de diciembre al 19 de enero
    Acuario: 20 de enero al 18 de febrero
    Piscis: 19 de febrero al 20 de marzo
    */
   //Capricornio
   if((this.mes==1 && this.dia>=1)&&(this.mes==1 && this.dia<=19)){
    this.signoAsignar="Capricornio";
    }
    //Piscis Si Es Año Bisiesto
    if(this.mes==2 && this.dia==29){
      this.signoAsignar="Piscis";
    }
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Acuario";
    }
    this.Incio=new Date(Date.UTC(this.anio,1,19,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,2,20,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Piscis";
    }
    this.Incio=new Date(Date.UTC(this.anio,2,21,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,3,19,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Aries";
    }
    this.Incio=new Date(Date.UTC(this.anio,3,20,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,4,20,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Tauro";
    }
    this.Incio=new Date(Date.UTC(this.anio,4,21,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,5,20,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Géminis";
    }
    this.Incio=new Date(Date.UTC(this.anio,5,21,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,6,22,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Cáncer";
    }
    this.Incio=new Date(Date.UTC(this.anio,6,23,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,7,22,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Leo";
    }
    this.Incio=new Date(Date.UTC(this.anio,7,23,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,8,22,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Virgo";
    }
    this.Incio=new Date(Date.UTC(this.anio,8,23,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,9,22,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Libra";
    }
    this.Incio=new Date(Date.UTC(this.anio,9,23,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,10,21,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Escorpio";
    }
    this.Incio=new Date(Date.UTC(this.anio,10,22,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,11,21,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Sagitario";
    }
    this.Incio=new Date(Date.UTC(this.anio,11,22,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,11,31,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Capricornio";
    }
    /*Siguiendo La Linea Capricornio
    this.Incio=new Date(Date.UTC(this.anio,11,22,0,0,0,0));
    this.Fin=new Date(Date.UTC(this.anio,0,19,23,59,59,999));
    if(this.FN.getTime()>=this.Incio.getTime() && this.FN.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Capricornio";
    }
    */
    
    /*
    if(this.usuario.fecha_nacimiento.getTime()>=this.Incio.getTime() && this.usuario.fecha_nacimiento.getTime()<=this.Fin.getTime()){
      this.signoAsignar="Acuario";
    }
    this.Incio=new Date(this.anio,1,19);
    this.Fin=new Date(this.anio,2,20);
    if(this.usuario.fecha_nacimiento>=this.Incio && this.usuario.fecha_nacimiento<=this.Fin){
      this.signoAsignar="Piscis";
    }
    this.Incio=new Date(this.anio,2,21);
    this.Fin=new Date(this.anio,3,19);
    if(this.usuario.fecha_nacimiento>=this.Incio && this.usuario.fecha_nacimiento<=this.Fin){
      this.signoAsignar="Aries";
    }
    */
   //alert(this.usuario.fecha_nacimiento.getTime());
    
    alert(this.signoAsignar);
    this.usuario.signo=this.signoAsignar;
    //alert(this.FN.toISOString());
    //alert(this.Incio.toISOString());
    //alert(this.Fin.toISOString());
    
    

    //const mes2 = String(this.usuario.fecha_nacimiento.getMonth() + 1).padStart(2, '0');
    //const dia2 = String(this.usuario.fecha_nacimiento.getDate()).padStart(2, '0');
    //alert(mes2+ " "+dia2);
  }
  // CREAR O ACTUALIZAR UN USUARIO
  guardarUsuario(): void {
    this.metodo2();
    if (this.editando && this.idEditando !== null) {
      // SI ESTAMOS EDITANDO, ENVIAREMOS PUT
      //this.metodo2();
      this.usuarioService.updateUsuario(this.idEditando, this.usuario).subscribe(() => {
        this.getUsuarios();
        this.resetFormulario();
      });
    } else {
      // SI NO ESTAMOS EDITANDO, CREAMOS UN NUEVO USUARIO
      //this.metodo2();
      this.usuarioService.addUsuario(this.usuario).subscribe(() => {
        //alert("id"+this.usuario.id);
        this.getUsuarios();
        this.resetFormulario();
      });
    }
  }
  // LLENAR EL FORMULARIO CON LOS DATOS DEL USUARIO AL EDITAR
  editar(usuario: Usuario): void {
    this.usuario = { ...usuario };
    this.editando = true;
    this.idEditando = usuario.id!;
    
    //this.fecha_nacimientoC=this.usuario.fecha_nacimiento;
  }

  // ELIMINAR UN USUARIO
  eliminar(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }

  // RESTABLECER EL FORMULARIO A SU ESTADO ORIGINAL
  resetFormulario(): void {
    this.usuario = { nombre: '', contrasena:'', email: '',fecha_nacimiento: new Date(),signo: '' };
    this.editando = false;
    this.idEditando = null;
  }
}


