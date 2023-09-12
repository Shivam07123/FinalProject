import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { category } from './category';
import { product } from './product';
import { productbycategory } from './productbycategory';
import { users } from './users';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

public amount:any

public static login?:boolean=false;
public static username?:string='';

private paymentInfo: any={};

  constructor(private http : HttpClient) { }



public createTransaction(amount:any)
{
return this.http.get("http://localhost:9091/api/getTransaction/"+amount);
}



checkuserexists(u:users):Observable<users>
{
  return this.http.post<users>(`http://localhost:9091/api/checkuser`,u);
}


  getallcategory():Observable<category[]>
  {
    return this.http.get<category[]>(`http://localhost:9091/api/allcat`)
  }


  getcatbyid():Observable<category>
  {
    return this.http.get<category>(`http://localhost:9091/api/catbyid/1`);
  }


  addCategory(c : category):Observable<category>
  {
    return this.http.post<category>(`http://localhost:9091/api/addcat`,c);
  }

  updatecategory(c:category):Observable<category>
  {
    return this.http.put<category>(`http://localhost:9091/api/updatecat/`+c.catid,c);
  }

  deletecategory(c:category):Observable<category>
  {
    return this.http.delete<category>(`http://localhost:9091/api/deletecat/`+c.catid);
  }



  getallproduct():Observable<product[]>
  {
    return this.http.get<product[]>(`http://localhost:9091/api/allprdt`)
  }


  getallproductbycategory(e:any):Observable<productbycategory[]>
  {
    return this.http.get<productbycategory[]>(`http://localhost:9091/api/allprdtcat/`+e)
  }

  deleteprdt(p:product):Observable<product>
  {
    return this.http.delete<product>(`http://localhost:9091/api/deleteprdt/`+p.prid);
  }

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }


  sendEmail(em : any)  {
    return this.http.post<any>(`http://localhost:9091/api/sendmail`, em);
  }

  addUser(u :any):Observable<any>
  {
    return this.http.post<any>(`http://localhost:9091/api/adduser`,u);
  }


  setPaymentInfo(paymentInfo: any) {
    this.paymentInfo = paymentInfo;
  }

  getPaymentInfo() {
    return this.paymentInfo;
  }
}
