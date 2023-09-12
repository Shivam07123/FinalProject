import { Component, OnDestroy, OnInit ,EventEmitter,Input,Output} from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { category } from 'src/app/category';
import { productbycategory } from 'src/app/productbycategory';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit{

  catObj?:category[]=[]
  catid?:number
  cart?:any[]=[]
  tot=0;
  options?:any

  prdtbycat?:productbycategory[]=[]

  prdtbycate: any[] = [];
  cartItems: any[] = [];

  searchResults: string[] = [];
  filteredPizzas:any[]=[]
  searchTerm: string = '';
  selectedFilter: string = 'all';

  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private serv:MyserviceService, private cartService:CartService)
  {
     this.serv.getallcategory().subscribe(res=>this.catObj=res,err=>console.log(err))
     this.serv.getallproduct().subscribe(res=>this.prdtbycat=res,err=>console.log(err))
  }

  performSearch(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredPizzas = this.prdtbycat.filter(category => {
      if (this.selectedFilter === 'all' || category.descrip === this.selectedFilter) {
        return category.descrip.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });
  }

  // showValue(){console.log(this.catid)

  //   this.serv.getallproductbycategory(this.catid).subscribe(res=>
  //   this.prdtbycat=res,err=>console.log(err) )
  // }


  deletecart(a?:any)
  {
  let obj={}
  this.tot=0;
    let index = this.cart.indexOf(a);

    this.cart.splice(index, 1);
    //first delete existing list
    // localStorage.removeItem(a.prnm);

    // for (var i = 0; i < localStorage.length; ++i) {
    //   var key = localStorage.key(i);
    //   var value = localStorage.getItem(key);
    //   obj=JSON.parse(value)
    //   this.tot += obj["price"]
    //   }
  }


    ngOnInit(): void {
      // Initialize prdtbycat with your data
      this.cartItems = this.cartService.getCartItems();
    }

    addToCart(item: any): void {
      this.cartService.addToCart(item);
      this.cartItems = this.cartService.getCartItems();
      alert("Added to Cart"+" "+item.prnm)
    }

    setPage(page: number) {
      this.currentPage = page;
    }


}


