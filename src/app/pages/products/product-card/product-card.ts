import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../product';

@Component({
	selector: 'app-product-card',
	imports: [CurrencyPipe],
	templateUrl: './product-card.html',
	styleUrl: './product-card.css'
})

export class ProductCard {
	public readonly product = input.required<Product>();
	protected readonly addToCart = output<Product>();
}