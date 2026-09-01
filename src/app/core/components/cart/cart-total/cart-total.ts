import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-total',
  imports: [CurrencyPipe],
  templateUrl: './cart-total.html',
	styleUrl: './cart-total.css'
})

export class CartTotal {
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;
  cartTotal = this.cartService.cartTotal;
  shipmentFee = this.cartService.shipmentFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice; 
	onClearCart(){
		this.cartService.resetCart();
	}
}