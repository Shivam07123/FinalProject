import { Component } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
em:any


constructor(private serv:MyserviceService){}

sendEmail(){
  this.serv.sendEmail(this.em).subscribe(res=>{console.log(res);
  alert("Mail Send Sucessfully")
}
 , err=>console.log(err))
}
}
