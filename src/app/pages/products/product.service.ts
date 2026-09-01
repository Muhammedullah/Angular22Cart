import { Service, signal, computed, debounced } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Product } from './product';

@Service()
export class ProductService {
	private _API_URL = 'https://fakestoreapi.com/products';
	private readonly _searchTerm = signal<string>('');			// Reactive search query signal
  private readonly _debouncedQuery = debounced(this._searchTerm, 300);  // Native Angular 22 debounce (300ms delay)
  private readonly _limit = signal<number>(20);
  private readonly _category = signal<string>('');
	private _products = httpResource<Product[]>(() => ({
		url: this._API_URL,
		method: 'GET',
		params: {
			q: this._searchTerm().trim(),
			limit: this._limit(),
			category: this._category()
		}
	}), { defaultValue: [] });		// Starts with empty array instead of undefined

	public updateSearch(query: any): void {
		this._searchTerm.update(query);
	}
	public readonly products = this._products.asReadonly();
/*
  public readonly filteredProducts = computed<Product[]>(() => {
		const term = this._searchTerm().toLocaleLowerCase().trim();
		if(!term) return this._products;
		return this._products.filter(product: Product => product.name.toLocaleLowerCase().includes(term) || product.description.toLocaleLowerCase().includes(term));
	});*/
}


///////////////////////////////////////////////////////////////////////////////////////////
/*
import { Service, signal, debounced } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Service()
export class ProductService {
	private readonly _searchTerm = signal('');			// Reactive search query signal
  private readonly _debouncedQuery = debounced(this._searchTerm.trim(), 300);  // Native Angular 22 debounce (300ms delay)
	private readonly _products = httpResource<Product[]>(() => {	// Automatically fires GET requests when searchTerm() updates
		const query = this._debouncedQuery.value();
    if(query) return {
      url: this.API_URL,
      params: { q: query }
    };
	}, { defaultValue: [] });
	public readonly products = this._products.value;				// Expose clean helper signals for UI consumption
	public readonly isLoading = this._products.isLoading;
	public readonly error = this._products.error;
	public updateSearch(query: string): void { // function updateSearch() called from input search component
		this._searchTerm.set(query);
	}
}
*/