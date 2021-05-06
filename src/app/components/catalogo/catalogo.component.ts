import { Component, OnInit } from '@angular/core';
import { ItemCompra } from '../../models/itemCompra';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../models/catalogo';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  catalogos: Catalogo[];

  defaultCatalogo: Catalogo;

  itemsCompra: ItemCompra[];

  constructor(private catalogosService: CatalogoService) { }

  ngOnInit(): void {
    this.getCatalogos();
    this.getItemsCompra(this.defaultCatalogo.id);
  }

  getCatalogos(): void{
    this.catalogosService.getCatalogos().subscribe(catalogos => this.catalogos = catalogos);
    this.defaultCatalogo = this.catalogos[0];
  }

  getItemsCompra(catalogo_id: number): void{
    this.catalogosService.getItemsCompra(catalogo_id).subscribe(itemsCompra => this.itemsCompra = itemsCompra);
  }
}
