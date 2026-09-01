import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
	selector: 'app-navbar',
	templateUrl: './navbar.html',
	styleUrl: './navbar.css'
})

export class Navbar {
	protected readonly items = [
		{ link: 'home', 		title: 'Home' },
		{ link: 'about', 		title: 'About' },
		{ link: 'angular', 	title: 'Angular' },
		{ link: 'products', title: 'Products' },
		{ link: 'vehicles', title: 'Vehicle List', opt: {exact: true} },
		{ link: 'services', title: 'Services' },
		{ link: 'contact', 	title: 'Contact' }
	];
}