import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { CartList } from './cart-list/cart-list';
import { CartTotal } from './cart-total/cart-total';

@Component({
  imports: [RouterLink, CartList, CartTotal],
  templateUrl: './cart.html',
	styleUrl: './cart.css'
})

export default class Cart {
  title = 'Shopping Cart';
	protected cartItems = inject(CartService).cartItems;
}