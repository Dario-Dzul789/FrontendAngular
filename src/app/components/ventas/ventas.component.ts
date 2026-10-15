import { Component, OnInit,Renderer2, ElementRef, ViewChild } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';
import { VentasdetallesService } from '../../services/ventasdetalles.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  @ViewChild('tabla')mitabla!:ElementRef;
  todosDetallesVenta: any[] = [];
  ventas: Venta[] = [];

  venta:Venta={id_venta:"",productos:"",total_venta:  0 ,fecha_venta: new Date()};

  constructor(private ventaService:VentaService,private ventadetalleService:VentasdetallesService,private renderer2:Renderer2) {}

  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {

  }

  
  dia:number=0;
  diaTexto:string="";
  mes:number=0;
  mesTexto:string="";
  anio:number=0;
  anioTexto:string="";
  Incio:Date=new Date("2025-05-31");
  Fin:Date=new Date("2025-05-31");
  metodo(){
    //const d2 = new Date(this.usuario.fecha_nacimiento).getDate();
    //const d3 = new Date(this.usuario.fecha_nacimiento).getMonth();
    const d4 = new Date(this.fechaInicio).toISOString();
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
    this.Incio=new Date(Date.UTC(this.anio,this.mes-1,this.dia,0,0,0,0));
    alert(this.fechaInicio);
    alert(this.Incio.toISOString());

    const d5 = new Date(this.fechaFinal).toISOString();
    this.anioTexto=d5[0]+d5[1]+d5[2]+d5[3];
    this.mesTexto=d5[5]+d5[6];
    this.diaTexto=d5[8]+d5[9];
    this.anio=parseInt(this.anioTexto);
    this.mes=parseInt(this.mesTexto);
    this.dia=parseInt(this.diaTexto);
    this.Fin=new Date(Date.UTC(this.anio,this.mes-1,this.dia,23,59,59,999));
    alert(this.fechaFinal);
    alert(this.Fin.toISOString());
    

    
    
    /*
    //alert(this.usuario.fecha_nacimiento);
    //alert(this.mesTexto);
    //alert(this.diaTexto);
    //alert(this.mes);
    //alert(this.dia);
    //alert(this.anio);
    */
    
  }
  verVenta(){
    //Es Para que no se vea la tabla de abajo
    //const mitabla=this.mitabla.nativeElement;
    //this.renderer2.setStyle(mitabla, 'visibility', 'hidden');
    this.ventaService.getVentaPorFechas(this.fechaInicio,this.fechaFinal).subscribe(data => {
    //this.ventaService.getVentaPorFechas(this.Incio,this.Fin).subscribe(data => {
      this.ventas=data;
      
    });
    //alert(this.codigoB)

  }
  productos: string[] = [];
  ProductosLista:string="";
  verProductos(venta:string){
    this.productos=venta.split(",");
    for(let i=0; i< this.productos.length; i++){
      this.ProductosLista+=this.productos[i]+"\n";
    }
    alert(this.ProductosLista);
    this.ProductosLista="";
    this.productos= [];
  }
  fechaInicio:Date=new Date();
  fechaFinal:Date=new Date();

  verDetallesVentas(id:number){
    const mitabla=this.mitabla.nativeElement;
    this.ventadetalleService.getVentasDetallesXIdVentas(id).subscribe(data=>{
      this.renderer2.setStyle(mitabla, 'visibility', 'visible');
      //alert(id);
      this.todosDetallesVenta=data;
    });
  }
}
