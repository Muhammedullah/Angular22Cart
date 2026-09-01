import { Component, signal, debounced } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-products',
  imports: [ProductList, FormsModule],
  templateUrl: './products.html',
	styleUrl: './products.css'
})

export default class Products {
	protected readonly limit = signal(20);
  protected readonly searchTerm = signal<string>('');
//  protected readonly debouncedQuery = debounced(this.searchQuery, 1000);
  protected updateQuery(query: string): void {
    this.searchTerm.set(query); console.log('The query is: ', this.searchTerm());
  }
}