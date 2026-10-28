import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = { codigo: '', nombre: '', precio:0,existencia:0 };
  editando: boolean = false;
  idEditando: number | null = null;

  productos2 = [
    { sku: '123456781', nombre: 'Auriculares Bluetooth' },
    { sku: '987654322', nombre: 'Cargador USB-C' },
    { sku: '456789123', nombre: 'Teclado Mecánico' },
    { sku: '321654984', nombre: 'Mouse Inalámbrico' },
    { sku: '123456785', nombre: 'Auriculares Bluetooth' },
    { sku: '987654326', nombre: 'Cargador USB-C' },
    { sku: '456789127', nombre: 'Teclado Mecánico' },
    { sku: '321654988', nombre: 'Mouse Inalámbrico' },
    { sku: '123456789', nombre: 'Auriculares Bluetooth' },
    { sku: '987654310', nombre: 'Cargador USB-C' },
    { sku: '456789111', nombre: 'Teclado Mecánico' },
    { sku: '321654912', nombre: 'Mouse Inalámbrico' },
    { sku: '123456713', nombre: 'Auriculares Bluetooth' },
    { sku: '987654314', nombre: 'Cargador USB-C' },
    { sku: '456789115', nombre: 'Teclado Mecánico' },
    { sku: '321654916', nombre: 'Mouse Inalámbrico' },
    { sku: '123456717', nombre: 'Auriculares Bluetooth' },
    { sku: '987654318', nombre: 'Cargador USB-C' },
    { sku: '456789119', nombre: 'Teclado Mecánico' },
    { sku: '321654920', nombre: 'Mouse Inalámbrico' },
    { sku: '123456721', nombre: 'Auriculares Bluetooth' },
    { sku: '987654322', nombre: 'Cargador USB-C' },
    { sku: '456789123', nombre: 'Teclado Mecánico' },
    { sku: '321654924', nombre: 'Mouse Inalámbrico' },
    { sku: '123456725', nombre: 'Auriculares Bluetooth' },
    { sku: '987654326', nombre: 'Cargador USB-C' },
    { sku: '456789127', nombre: 'Teclado Mecánico' },
    { sku: '321654928', nombre: 'Ultimo' }
  ];
  

crearPDF() {
  const doc = new jsPDF();
  const colW = 90;
  const x1 = 10, x2 = 100;
  const rowH = 32;
  const pageH = doc.internal.pageSize.getHeight(); // 297
  const marginBottom = 10;
  let y = 15;

  this.productos.forEach((Producto, i) => {
    const x = i % 2 === 0 ? x1 : x2;

    // ⬇️ SALTAR DE PÁGINA si no cabe la fila
    if (i % 2 === 0 && i > 0) {
      y += rowH;
      if (y + rowH > pageH - marginBottom) {
        doc.addPage();
        y = 15;
      }
    }

    const canvas = document.createElement('canvas');
    JsBarcode(canvas, Producto.codigo, {
      format: 'CODE128', height: 40, width: 1.5, displayValue: false
    });
    const img = canvas.toDataURL('image/png');

    doc.addImage(img, 'PNG', x, y, 55, 14);
    doc.setFontSize(9);
    doc.text(Producto.codigo, x, y + 20);
    doc.setFontSize(10);
    doc.text(Producto.nombre, x, y + 26);

    doc.setDrawColor(200);
    doc.line(x, y + rowH - 4, x + colW - 5, y + rowH - 4);
  });

  doc.save('productos.pdf');
}


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


