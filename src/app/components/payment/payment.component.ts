import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PaymentStorage} from '../../models/paymentStorage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cityText: string;
  addressText: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToSelectDate(): void{
    if (!this.cityText || !this.addressText) {
      window.alert('Diligencia la información requerida');
    } else {
      console.log('continua');
      const paymentData = {
        city : this.cityText,
        address: this.addressText
      };
      sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
      this.router.navigate(['/select-date']);
    }
  }
}
