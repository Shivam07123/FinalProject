import { Component,EventEmitter,Input,Output } from '@angular/core';
import { product } from 'src/app/product';
import { FormGroup , FormBuilder} from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { category } from 'src/app/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  srcdata:product[]=[]
  src?:string |any

  p:number=1;
  count:number=5;


 prdtObj !:FormGroup;
 allcategory:category[]=[];
 uploadfile?:any
 imageURL?:any

 uploadresultData?:any



 constructor(private formbuild: FormBuilder,private  serv:MyserviceService, private http:HttpClient)
 {

     this.serv.getallcategory().subscribe(res=>this.allcategory=res)

     this.serv.getallproduct().subscribe(res=>{this.srcdata=res
     })


     this.prdtObj = this.formbuild.group({
       prid:[''],
       prnm:[''],
       ct_catid:[''],
       price:[''],
       descrip:[''],
       qty:[''],
       reorder:[''],
       pic:['']
     })

 }

 ImageUpload(e?:any)
 {
  this.uploadfile = (e.target as HTMLInputElement).files[0];
  console.log(this.uploadfile)

   // File Preview
   const reader = new FileReader();
   reader.onload = () => {
         this.imageURL = reader.result as string;
 }
 reader.readAsDataURL(this.uploadfile)


 }

 uploadData()
 {

   this.uploadresultData = new FormData()

   this.uploadresultData.append("prnm",this.prdtObj.controls.prnm.value)
   this.uploadresultData.append("ct_catid",this.prdtObj.controls.ct_catid.value)
   this.uploadresultData.append("price",this.prdtObj.controls.price.value)
   this.uploadresultData.append("descrip",this.prdtObj.controls.descrip.value)
   this.uploadresultData.append("qty",this.prdtObj.controls.qty.value)
   this.uploadresultData.append("reorder",this.prdtObj.controls.reorder.value)
   this.uploadresultData.append("pic",this.uploadfile,this.uploadfile.name)

 console.log(this.uploadresultData)

 this.http.post(`http://localhost:9091/api/addprdt`,this.uploadresultData,{
 responseType:"json",
 reportProgress:true,
 observe:"response"
 }).subscribe(res=>alert("Product is Added Successfully ! "),err=>console.log(err))

 }


   searchitem()
   {
       this.srcdata = this.srcdata.filter((v:any) =>
             v.prnm.indexOf(this.src) !==-1)
             console.log(this.srcdata)
   }


   func(e:any)
   {
     console.log(e);
   }

   getcolor(prid:any) {
     if(prid>105)
         return "green"
     else
         return "red"
     }


     changePage(e: number)
     {
       this.p = e;
       this.serv.getallproduct();
     }

     deleteprdt(e:any){

      this.serv.deleteprdt(e).subscribe(res=> {alert("Product is deleted ! ");

      },
      err=>console.log(err))
     }
}
