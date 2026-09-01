import { Component, input, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartType } from '../../cart-type';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart-item.html',
	styleUrl: './cart-item.css'
})

export class CartItem {
  private readonly cartService = inject(CartService);
  public readonly cartItem = input.required<CartType>();
  protected readonly amount = computed(() => this.cartItem().quantity * Number(this.cartItem().price));
	protected decrease(quantity: number){
		if(quantity < 2) this.cartService.removeFromCart(this.cartItem());
		this.cartService.updateQuantity(this.cartItem(), Number(quantity - 1));
	}
	protected increase(quantity: number){
		this.cartService.updateQuantity(this.cartItem(), Number(quantity + 1));
	}
  protected onRemove(): void {
    this.cartService.removeFromCart(this.cartItem());
  }
}