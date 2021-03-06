import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import {AddProductService} from '../../services/add-product.service';
import { Router, RouterModule } from '@angular/router';
import {ItemCompra} from '../../models/itemCompra';
import {Catalogo} from '../../models/catalogo';


@Component({
  selector: 'app-catalogo-admin',
  templateUrl: './catalogo-admin.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoAdminComponent implements OnInit {
  cantidad: number;
  catalogos: Catalogo[];
  itemsCompra: ItemCompra[];
  icSeleccionado: ItemCompra;

  constructor(
    private catalogosService: CatalogoService,
    private router: Router,
    private addProductService: AddProductService
    ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    this.getCatalogos();
  }

  getCatalogos(): void{
    this.catalogosService.getCatalogos().subscribe(
      catalogos => {
        const listadoCatalogos = catalogos;
        this.catalogos = catalogos;
        this.getItemsCompra(listadoCatalogos[0].id);
      });
  }

  getItemsCompra(catalogoId: number): void{
    this.catalogosService.getItemsCompra(catalogoId).subscribe(
    itemsCompra => {
      this.getProductos(catalogoId, itemsCompra, 0);
    });
  }

  getProductos(catalogoId: number, items: ItemCompra[], index: number): void{
      if (index < items.length)
      {
        const item = items[index];
        this.catalogosService.getProducto(catalogoId, item.id).subscribe(
        producto => {
          item.producto = producto[0];
          items[index] = item;
          index++;
          this.getProductos(catalogoId, items, index);
        });
      }
      else
      {
        this.itemsCompra = items;
        console.log('test', this.itemsCompra);
        return;
      }
  }

  selectedProduct(ic: ItemCompra): void{
    this.icSeleccionado = ic;
  }

  unselect(): void{
    this.icSeleccionado = null;
    this.router.navigate(['/catalogoA']);
  }

  remove(itemC: ItemCompra): void{
    this.catalogosService.remove(this.catalogos[0].id, itemC.id).subscribe(
    item => {
    this.itemsCompra[itemC.id - 1].visibilidad = false;
    });
  }

  add(itemC: ItemCompra): void{
    this.catalogosService.add(this.catalogos[0].id, itemC.id).subscribe(
    item => {
    this.itemsCompra[itemC.id - 1].visibilidad = true;
    });
  }
}
