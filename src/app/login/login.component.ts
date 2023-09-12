import { Component, EventEmitter, Output } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productbycategory } from '../productbycategory';
import { HttpClient } from '@angular/common/http';
import { users } from '../users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent {
  @Output() searchEvent = new EventEmitter<any>();

  loginform !: FormGroup
  userloginform !:FormGroup
  username?:string

  em: string;
  password: string;
  
  phone?:number;
  pwd?:string;
  name?:string
  email1:string

   data = {
    toEmail: 'shivamharimkar17@gmail.com',
    subject: 'Forgot Password',
    message: '123456'
  };

  usersexists={};
  prdtbycat:productbycategory[]=[];


  filteredPizzas:any[]=[]
  searchTerm: string = '';
  selectedFilter: string = 'all';

  constructor(private formbuilder:FormBuilder, private router:Router ,private serv:MyserviceService , private http:HttpClient)
    {
      this.serv.getallproduct().subscribe(res=>this.prdtbycat=res,err=>console.log(err))

      this.userloginform = this.formbuilder.group({
          name :['', Validators.required],
          email1: ['', Validators.required],
          phone: ['', Validators.required],
          pwd: ['', Validators.required]
        })
        this.loginform = this.formbuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
        });
    }

    adduser(){
      let usr = {em:this.email1, name:this.name, pwd:this.pwd, phone:this.phone }
      console.log(usr);
      this.serv.addUser(usr).subscribe(res=>alert("Sign Up Sucessfully"),
      err=>console.log)
    }

    ngOnInit(): void {}

    checkuser()
    {
      let obj = {em:this.em,password:this.password}
    console.log(obj)

    this.serv.checkuserexists(obj).subscribe(
      res=>this.usersexists=res
           ,
      err=>console.log(err));

    if(this.usersexists===true){
      MyserviceService.login=true;
      MyserviceService.username=this.username;
         this.router.navigate(["/admin"])}
    else{
      MyserviceService.login=false;
      MyserviceService.username='';

       alert("UserName or Password not matched ! ");
       this.router.navigate(["/"])
      }

  }


    performSearch() {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredPizzas = this.prdtbycat.filter(category => {
        if (this.selectedFilter === 'all' || category.prnm === this.selectedFilter) {
          return category.prnm.toLowerCase().includes(lowerCaseSearchTerm);
        }
        this.searchEvent.emit(this.filteredPizzas);
        return false;
      });
    }

  showModal: boolean = false;



    openModal() {
      this.showModal = true;
    }



    openLoginModal() {
      const loginModal = document.getElementById('loginModal');
      if (loginModal) {
        loginModal.style.display = 'block';
      }
    }

    openSignupModal() {
      const signupModal = document.getElementById('signupModal');
      if (signupModal) {
        signupModal.style.display = 'block';

      }
    }

    closeModal() {
      const modals = document.getElementsByClassName('modal');
      for (let i = 0; i < modals.length; i++) {
        const modal = modals[i] as HTMLElement;
        modal.style.display = 'none';
      }
    }

    mailVerify(){
    this.http.post('/api/sendmail', this.data, { responseType: 'text' }).subscribe(
      (response) => {
        // Handle the response here, which will be a plain text response.
        console.log('Response:', response);
      },
      (error) => {
        // Handle errors.
        console.error('Error:', error);
    })
    }



    onSubmit(): void {
      if (this.userloginform.valid) {
        const userData = this.userloginform.value;

        // Call the service to add the user
        this.serv.addUser(userData).subscribe((result) =>alert("User Register Sucessfully"+result),
        (err)=>console.log(err));
      }
    }
    }




