import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private  http: HttpClient) { }

  API_URL  =  'https://mercado-organico-django.herokuapp.com';

   getShoppingCart(userId: number): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.http.get(`${this.API_URL}/carrito/` + userId).subscribe(
        (response: HttpResponse<any>) => {
          resolve(response);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
     });
  }

  createShoppingCart(userId: number): Promise<any> {
     const headers = { 'content-type': 'application/json'};
     return new Promise( (resolve, reject) => {
      this.http.post(`${this.API_URL}/carrito/` + userId,
        {
         usuario_id: userId
       },
       {headers}
      ).subscribe(
        (response) => {
          resolve(response);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
     });
  }

  addItem(userId: number, itemId: number, cantidad: number): Promise<any> {
     const headers = { 'content-type': 'application/json'};
     return new Promise( (resolve, reject) => {
      this.http.post(`${this.API_URL}/itemcarrito/` + userId,
        {
          usuario_id: userId,
          item_compras: [
            {
              itemCompra_id: itemId,
              cantidad
            }
          ]
       },
       {headers}
      ).subscribe(
        (response) => {
          resolve(response);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
     });
  }
}
