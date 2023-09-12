import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements  OnInit {

  paymentInfo: any;
  name="Crazy Deals";
  Address="Online Shopping"
  total:any

  constructor(private paymentService: MyserviceService) { }

  ngOnInit(): void {

    this.paymentInfo = this.paymentService.getPaymentInfo();
    this.total = this.paymentService.amount
  }
}
