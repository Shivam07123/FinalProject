import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { product } from './product';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { FooterComponent } from './footer/footer.component';
import { BillComponent } from './bill/bill.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    ProductComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    ForgotPassComponent,
    FooterComponent,
    BillComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,NgxPaginationModule,FormsModule,FlexLayoutModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent },
      {path:'login', component:LoginComponent },
      {path:'admin', component:AdminPanelComponent },
      {path:'product', component:product },
      {path:'home', component:HomeComponent },
      {path:'cart', component:CartComponent },
      {path:'forgot', component:ForgotPassComponent },
      {path:'bill', component:BillComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
