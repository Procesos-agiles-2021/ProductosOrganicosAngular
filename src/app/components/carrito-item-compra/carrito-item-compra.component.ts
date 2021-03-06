import {Component } from '@angular/core';
import { CarritoItemCompraService } from '../../services/carrito-item-compra.service';
import {ItemCarrito} from '../../models/itemCarrito';
import {Router} from '@angular/router';

@Component({
    selector: 'app-carrito-item-compra',
    templateUrl: './carrito-item-compra.component.html'
})

export class CarritoItemCompraComponent {
    itemsCarrito: ItemCarrito[];
    userID: number;
    precioTotal: number;
    status: string;

    constructor(
      private carritoService: CarritoItemCompraService,
      private router: Router
    ) { }

    ngOnInit(): void {
        this.userID =  Number(localStorage.getItem('userId'));
        this.getItemsCarrito();
    }

    async getItemsCarrito(): Promise<any>{
        const carrito = await this.carritoService.getShoppingCart(this.userID);
        this.getProductos(carrito[0].item_compras, 0);
    }

    getProductos(items: ItemCarrito[], index: number): void{
      if (index < items.length)
      {
        const item = items[index];
        this.carritoService.getProducto(item.item_compra_id).subscribe(
        producto => {
          item.producto = producto[0];
          items[index] = item;
          index++;
          this.getProductos(items, index);
        });
      }
      else
      {
        this.itemsCarrito = items;
        this.calcularTotal(items);
        this.enablePayButton();
        return;
      }
    }

    calcularTotal(items: ItemCarrito[]): void{
      let total = 0;
      items.forEach((item) => {
        total += item.cantidad * item.producto.precio;
      });
      this.precioTotal = total;
    }

    delToCart(Itemid: number): void{
        this.carritoService.delProducto(this.userID, Itemid).subscribe(() => {
          this.status = 'Delete successful';
          this.ngOnInit();
        });
    }

    goToPay(): void {
      sessionStorage.setItem('precioTotal', this.precioTotal.toString());
      this.router.navigate(['/payment']);
    }

    goToCatalog(): void {
      this.router.navigate(['/catalogo']);
    }

    enablePayButton(): void {
      (document.getElementById('pay-button') as HTMLInputElement).disabled = false;
    }
}
