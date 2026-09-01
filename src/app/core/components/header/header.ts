import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { CartService } from '../cart/cart.service';

@Component({
	imports: [RouterLink, RouterLinkActive, Navbar],
	selector: 'app-header',
	templateUrl: './header.html',
	styleUrl: './header.css'
})

export class Header {
	public altText = signal('GlobalTex');
  protected readonly cartCount = inject(CartService).cartCount;
}