import { Service, signal, computed } from '@angular/core';
import { Product } from '@app/pages/products/product';
import { CartType } from './cart-type';

@Service()
export class CartService {
	private readonly LOCAL_STORAGE = 'cart_data';
	public readonly cartItems = signal<CartType[]>(this.loadCart());
	public readonly cartCount 	= computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
	public readonly cartTotal 	= computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity * item.price, 0));
	public readonly shipmentFee = computed(() => this.cartTotal() < 2000 ? 99 : 0);
	public readonly tax 				= computed(() => this.cartTotal() * 10.75 / 100);
	public readonly totalPrice 	= computed(() => this.cartTotal() + this.shipmentFee() + this.tax());

	public addToCart(product: Product): void {
		this.cartItems.update(items => {
			const exists = items.some(item => item.id === product.id);
			if(exists) return items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
			return [...items, { ...product, quantity: 1 }];
		});
		this.saveCart();
	}

	public updateQuantity(cartItem: CartType, quantity: number): void {
		this.cartItems.update(items => items.map(item => item.id === cartItem.id ? {...item, quantity} : item));
		this.saveCart();
	}

	public removeFromCart(cartItem: CartType): void { // 🗑️ REMOVE FROM CART 🛒
		this.cartItems.update(items => items.filter(item => item.id !== cartItem.id));
		this.saveCart();
	}

	public resetCart(){	// THE CART 🛒 RESET METHOD
		this.cartItems.set([]);
		localStorage.removeItem(this.LOCAL_STORAGE);
	}

	private saveCart(){
		localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(this.cartItems()));
	}

	private loadCart(): CartType[] {
		const data = localStorage.getItem(this.LOCAL_STORAGE);
		return data ? JSON.parse(data) : [];
	}
}