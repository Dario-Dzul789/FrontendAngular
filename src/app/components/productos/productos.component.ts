import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = { codigo: '', nombre: '', precio:0,existencia:0 };
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private productoService: ProductoService) {}

  // SE LANZA AUTOMATICAMENTE AL MOSTRAR EL COMPONENTE
  ngOnInit(): void {
    this.getProductos();
  }

  // CARGAR ProductoS DESDE EL BACKEND
  getProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  // CREAR O ACTUALIZAR UN Producto
  guardarProducto(): void {
    if (this.editando && this.idEditando !== null) {
      // SI ESTAMOS EDITANDO, ENVIAREMOS PUT
      this.productoService.updateProducto(this.idEditando, this.producto).subscribe(() => {
        this.getProductos();
        this.resetFormulario();
      });
    } else {
      // SI NO ESTAMOS EDITANDO, CREAMOS UN NUEVO Producto
      this.productoService.addProducto(this.producto).subscribe(() => {
        this.getProductos();
        this.resetFormulario();
      });
    }
  }

  // LLENAR EL FORMULARIO CON LOS DATOS DEL Producto AL EDITAR
  editar(producto: Producto): void {
    this.producto = { ...producto };
    this.editando = true;
    this.idEditando = producto.id!;
  }

  // ELIMINAR UN Producto
  eliminar(id: number): void {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.getProductos();
    });
  }

  // RESTABLECER EL FORMULARIO A SU ESTADO ORIGINAL
  resetFormulario(): void {
    this.producto = { codigo:'', nombre: '',precio:0,existencia:0 };
    this.editando = false;
    this.idEditando = null;
  }
}


