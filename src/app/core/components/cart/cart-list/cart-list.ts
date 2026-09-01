import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from './cart-item/cart-item';

@Component({
  selector: 'app-cart-list',
  imports: [CartItem],
  templateUrl: 'cart-list.html',
	styleUrl: 'cart-list.css'
})

export class CartList {
	protected cartItems = inject(CartService).cartItems;
}