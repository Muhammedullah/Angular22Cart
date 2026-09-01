import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '@app/core/components/cart/cart.service';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
	selector: 'app-product-list',
	imports: [ProductCard, FormsModule],
	templateUrl: './product-list.html',
	styleUrl: './product-list.css'
})

export class ProductList {
	private readonly cartService = inject(CartService);
	private readonly productService = inject(ProductService);
	protected readonly products = this.productService.products;
  protected onAddToCart(product: Product): void {
		this.cartService.addToCart(product);
  }
	onSearchInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.productService.updateSearch(value);
	}
}