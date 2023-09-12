import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce AngularApp';
  searchResults: any[] = []; // Change 'any[]' to the actual type of your data

  handleSearch(results: any[]) {
    this.searchResults = results;
  }
}

