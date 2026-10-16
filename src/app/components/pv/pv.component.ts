import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';
import { Ventasdetalles } from '../../models/ventasdetalles';
import { VentasdetallesService } from '../../services/ventasdetalles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-pv',
  imports: [CommonModule, FormsModule],
  templateUrl: './pv.component.html',
  styleUrl: './pv.component.css'
})
export class PVComponent implements OnInit{
  productos: Producto[] = [];
  productosN: Producto[] = [];
  producto: Producto = { id: 0, codigo: '', nombre: '', precio:0,existencia:0 };
  venta:Venta={id:0, id_venta:"",productos:"",total_venta:  0 ,fecha_venta: new Date()};
  ventadetalle:Ventasdetalles={id: 0, idventa:  0, idproducto:0, cantidad: 0, precio_producto: 0, total_producto: 0};
  cantidades: number[] = [];
  totales: number[] = [];
  
  //ProductoCompleto = { id: 0, codigo: '', nombre: '', precio:0,cantida:0,total:0 };

  

  constructor(private productoService: ProductoService,private ventaService:VentaService,private ventadetalleService:VentasdetallesService) {
    //type ProductoCompleto ={ id: number; codigo: string; nombre: string; precio:number;cantidad: number;total_producto: number};
    //const productoscompletos: ProductoCompleto[] = [];
  }

  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {

  }

  //getProductoCodigo(codigo:string): void {
  cantidad:number=1;
  getProductoCodigo(): void {
    if(this.codigoB.trim()==""){
      return;
    }
    if(this.cantidad==null||this.cantidad<=0){
      return;
    }
    this.productoService.getProductoCodigo(this.codigoB).subscribe(data => {
      this.productosN=data;
      if(this.productosN.length!=0){
        this.indiceB = this.productos.findIndex(productos => productos.codigo === this.codigoB);
        //alert(this.indiceB);
        if(this.indiceB>=0){
          //this.cantidades[this.indiceB]=this.cantidades[this.indiceB]+1;
          this.cantidades[this.indiceB]=this.cantidades[this.indiceB]+this.cantidad;

          this.totales[this.indiceB]=this.cantidades[this.indiceB]*this.productos[this.indiceB].precio;
        }
        else{
          //alert(data[0].nombre);
          this.productos.push(data[0]);
          //this.cantidades.push(1);
          this.cantidades.push(this.cantidad);

          //this.totales.push(data[0].precio);
          this.totales.push(data[0].precio*this.cantidad);
        }
        
      }
      else{
        alert("No Existe El Producto");
        this.indiceB=-1;
      }
      this.calcularTotal();
      this.codigoB="";
      this.cantidad=1;
    });
    //alert(this.codigoB)
    
  }

  metodo(){
    const fechaLocal = new Date(); // Fecha y hora local actual
    const fechaUTC = new Date(
      fechaLocal.getUTCFullYear(),
      fechaLocal.getUTCMonth(),
      fechaLocal.getUTCDate(),
      fechaLocal.getUTCHours(),
      fechaLocal.getUTCMinutes(),
      fechaLocal.getUTCSeconds(),
    );
    //this.venta.fecha_venta=fechaUTC;

    this.venta.fecha_venta=new Date();
    alert(this.venta.fecha_venta.toLocaleDateString());
    alert(this.venta.fecha_venta.toLocaleTimeString()+" "+ this.venta.fecha_venta.getMilliseconds());

    //alert(this.venta.fecha_venta.toISOString());
    //let utcDateString = new Date(new Date().toUTCString()).toISOString();
    //alert(utcDateString);
  }
  codigoB:string="";
  indiceB:number=-1;
  eliminar(indice:number){
    this.productos.splice(indice,1);
    this.cantidades.splice(indice,1);
    this.totales.splice(indice,1);
    this.calcularTotal();
  }
  Total:number=0;
  Pago:number=0;
  Cambio:number=0;
  calcularTotal(){
    this.Total = this.totales.reduce((acumulador, current) => acumulador + current, 0);
    try{
      this.Cambio=this.Pago-this.Total;
    }
    catch{
      
    }
  }
  onInputChange(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    const entrada: number = Number(valor);
    this.Cambio=0;
    this.Cambio=entrada-this.Total;
  }
  detallesVenta:string="";
  codigoVenta=0;
  registrarVenta(){
    for(let i=0; i< this.cantidades.length; i++){
      this.detallesVenta+=this.productos[i].codigo+"-"+this.productos[i].nombre+"-"+this.productos[i].precio+"-"+this.cantidades[i]+"-"+this.totales[i]+",";
    }
    this.detallesVenta=this.detallesVenta.slice(0,-1);
    //alert(this.detallesVenta);

    this.venta.productos=this.detallesVenta;
    this.venta.total_venta=this.Total;
    this.venta.fecha_venta=new Date();
    //alert(this.venta.fecha_venta);
    
    
    //this.venta.fecha_venta=Parseda(new Date(new Date().toUTCString()).toISOString());
    this.ventaService.addVenta(this.venta).subscribe((data:any) => {
      this.codigoVenta=data[0].id;
      //this.metodo();
      //alert("Se Guardo Correctamente LA Venta Con El Codigo: "+this.codigoVenta);
      
      for(let i=0; i< this.productos.length; i++){
        this.ventadetalle.id=0;
        this.ventadetalle.idventa=this.codigoVenta;
        this.ventadetalle.idproducto=this.productos[i].id!;
        //alert(this.productos[i].id!);
        this.ventadetalle.cantidad=this.cantidades[i];
        this.ventadetalle.precio_producto=this.productos[i].precio;
        this.ventadetalle.total_producto=this.totales[i];
        this.ventadetalleService.addVentadetalles(this.ventadetalle).subscribe(() => {
        });
        //Actulizar La Existencia del producto
        this.producto.id=this.productos[i].id!;
        //this.producto.codigo=this.productos[i].codigo;
        //this.producto.nombre=this.productos[i].nombre;
        //this.producto.precio=this.productos[i].precio;
        this.producto.codigo="0000";
        this.producto.nombre="Vacio";
        this.producto.precio=0;
        this.producto.existencia=this.productos[i].existencia-this.cantidades[i];
        this.productoService.updateExistenciaProducto(this.producto).subscribe(() => {
        });

      }
      //alert("Se Guardo Correctamente LA Venta Con El Codigo: "+this.codigoVenta);
      //alert("Se Guardo Correctamente LA Venta Con El Codigo: "+data.id_venta);
      this.resetFormulario();
    });
    
    
  }
  resetFormulario(){
    this.productos= [];
    this.productosN = [];
    this.producto= { id: 0, codigo: '', nombre: '', precio:0,existencia:0 };
    this.venta={id:0,id_venta:"",productos:"",total_venta:  0 ,fecha_venta: new Date()};
    this.cantidades = [];
    this.totales= [];
    this.detallesVenta="";
    this.Total=0;
    this.calcularTotal();
    this.codigoVenta=0;
  }
}
