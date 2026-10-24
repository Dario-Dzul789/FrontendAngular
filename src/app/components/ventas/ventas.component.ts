import { Component, OnInit,Renderer2, ElementRef, ViewChild } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';
import { VentasdetallesService } from '../../services/ventasdetalles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { inject } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"


@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule,ModalComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  @ViewChild('tabla')mitabla!:ElementRef;
  @ViewChild('parrafo')miparrafo!:ElementRef;
  todosDetallesVenta: any[] = [];
  todosDetallesVentaReporte: any[] = [];
  ventas: Venta[] = [];

  venta:Venta={id_venta:"",productos:"",total_venta:  0 ,fecha_venta: new Date()};
  zonaHoraria: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  constructor(private ventaService:VentaService,private ventadetalleService:VentasdetallesService,private renderer2:Renderer2,public modal:ModalService) {}


  crearPDF() {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Reporte de ventas", 14, 22)
    doc.setFontSize(12)
    doc.text(`Desde: ${this.fechaInicio} Hasta: ${this.fechaFinal}`, 14, 30)

    let startY = 40

    doc.setFontSize(12)
       
        startY += 6
        doc.text(`Total venta: $${this.Total}`, 14, startY)

        startY + 4

        
        const productosTabla = this.todosDetallesVentaReporte.map(vd => [
          vd.id.toString(),
          vd.fecha_venta.toString(),
          vd.codigo,
          vd.producto,
          vd.cantidad.toString(),
          vd.precio_producto.toString(),
          vd.total_producto.toString(),
          vd.total_venta.toString()
          
        ])

        autoTable(doc, {
            startY: startY + 2,
            head: [["ID","Fecha Venta","Codigo","Producto","Cantidad","Precio Producto","Total Producto","Total Venta"]],
            body: productosTabla,
            margin: { left: 14, right: 14},
            styles: { fontSize: 10}, 
            theme: "grid"
            
        })
        const today = new Date();
    doc.save(`reporte_venta_${this.fechaInicio}_a_${this.fechaFinal}_Fecha_${today.toString()}.pdf`)
}

  abrir() {
    this.modal.open('Detalles', { mensaje: 'Que Tenga Buen Día' });
  }
  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {

  }
  isModalOpen = false;

  openModal()  { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }  
  @HostListener('document:keydown.escape')
  //onEscape() { this.isModalOpen = false; }
  onEscape() { this.modal.close() ;}
 
  
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
  Total:number=0;
  verVenta(){
    //Es Para que no se vea la tabla de abajo
    //const mitabla=this.mitabla.nativeElement;
    //this.renderer2.setStyle(mitabla, 'visibility', 'hidden');
    this.ventaService.getVentaPorFechas(this.fechaInicio,this.fechaFinal).subscribe(data => {
    //this.ventaService.getVentaPorFechas(this.Incio,this.Fin).subscribe(data => {
      this.ventas=data;
      this.Total = this.ventas.reduce((acc, item) => acc + (item.total_venta || 0), 0);
    });
    //alert(this.codigoB)

  }
  verVentaReporte(){
    //Es Para que no se vea la tabla de abajo
    //const mitabla=this.mitabla.nativeElement;
    //this.renderer2.setStyle(mitabla, 'visibility', 'hidden');
    this.ventaService.getVentaPorFechasReporte(this.fechaInicio,this.fechaFinal).subscribe(data => {
    //this.ventaService.getVentaPorFechas(this.Incio,this.Fin).subscribe(data => {
      this.todosDetallesVentaReporte=data;
      this.Total = this.todosDetallesVentaReporte.reduce((acc, item) => acc + (item.total_producto || 0), 0);
      this.crearPDF();
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

  TotalDV:number=0;
  verDetallesVentas(id:number){
    const mitabla=this.mitabla.nativeElement;
    const miparrafo=this.miparrafo.nativeElement;
    
    this.ventadetalleService.getVentasDetallesXIdVentas(id).subscribe(data=>{
      this.renderer2.setStyle(mitabla, 'visibility', 'visible');
      this.renderer2.setStyle(miparrafo, 'visibility', 'visible');
      //alert(id);
      this.todosDetallesVenta=data;
      this.TotalDV = this.todosDetallesVenta.reduce((acc, item) => acc + (item.total_producto || 0), 0);
    });
    this.abrir(); 
    //this.isModalOpen = true;
  }
}
