import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const baseUrl = 'https://mercado-organico-django.herokuapp.com/signout';
//const baseUrl = 'http://localhost:8000/signout';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) {

  }

  logout(token) {
    console.log('Started.. in service');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Token ' + token);
    return this.http.post(baseUrl, null, {headers}).toPromise()
        .then(res => console.log(res));
  }
}
