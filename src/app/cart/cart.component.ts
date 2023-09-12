import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

declare var Razorpay:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  options?:any
  tot: number=500;
  cart?:any[]=[]


  constructor(private cartService: CartService , private serv:MyserviceService, private router:Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }


  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
  }


  clearCart() {
    console.log(`Before clearing:`, this.cartItems);
    this.cartService.clearCart();
    this.cartItems = [];
    console.log(`After clearing:`, this.cartItems);
  }

  addtolocalstorage(a?:any)
{
  console.log(a);
  localStorage.setItem(a.prnm,JSON.stringify(a));
}

// showcart()
// {
//   let obj={};
//   this.tot=0;
//   this.cart=[];

//   for (var i = 0; i < localStorage.length; ++i) {
//     var key = localStorage.key(i);
//     var value = localStorage.getItem(key);
//     //console.log(key + ': ' + value);
// obj=JSON.parse(value)
// this.tot += obj["price"]
//     this.cart.push(obj);
// }
// }

private updateLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
}
// -----------------------------------------------------Payment Razorpay Implementation--------------------------------------------------------------


  getTotalPrice(): string {
    const totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
    this.serv.amount = totalPrice.toFixed(2)
    return this.tot = totalPrice.toFixed(2);

  }

  ordernow(){

    let result = window.confirm("Do you really want to confirm the order :");
    if(result)
      {
      this.serv.createTransaction(this.tot).subscribe(
        res => { console.log(res);
        this.openTransactionModal(res);
        },
        err=>
        {
          alert(" Error in confirming the order ! ");
        console.log(err); })
      }
  else {
        alert("Order is not confirm");
        }
  }

  openTransactionModal(response:any)
  {
  this.options={
  order_id: response.orderId,
  key:response.key,
  amount:response.amount,
  currency:response.currency,
  name:'Crazy Deals',
  description:'Payment gateway check',
  image:'https://cdn.pixabay.com/photo/2023/05/28/03/34/flowers8022731_640.jpg',
  handler: (response:any) =>{
  this.processResponse(response);
  },
  prefill:{
  name:'Shivam Harimkar',
  email:'shivamharimkar7@gmail.com',
  contact:'9588688128',
  },
  notes:{
  address:'Online Shopping'
  },
  theme:{
  color:'#F37254'
  }
  };


  let razorPayObject=new Razorpay(this.options);
  razorPayObject.open();
  }

  processResponse(resp: any) {
    console.log(resp);

    if (resp.razorpay_payment_id) {
      console.log('Payment successful! Redirecting to the bill page...');
      this.serv.setPaymentInfo(resp);

      this.router.navigate(['/bill']);
    } else {
      console.log('Payment failed.');

    }
  }


}
