import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./core/components/layout/layout'), title: 'Layout',
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', 		loadComponent: () => import('./pages/home/home'), 					title: 'Home' },
			{ path: 'cart', 		loadComponent: () => import('./core/components/cart/cart'), title: 'Cart' },
			{ path: 'about', 		loadComponent: () => import('./pages/about/about'), 				title: 'About' },
			{ path: 'angular', 	loadComponent: () => import('./pages/angular/angular'), 		title: 'Angular' },
			{ path: 'vehicles', loadComponent: () => import('./pages/vehicles/vehicles'), 	title: 'Vehicles' },
			{ path: 'products', loadComponent: () => import('./pages/products/products'), 	title: 'Products' },
			{ path: 'services', loadComponent: () => import('./pages/services/services'), 	title: 'Services' },
			{ path: 'contact', 	loadComponent: () => import('./pages/contact/contact'), 		title: 'Contact' },
			{ path: '**', 			loadComponent: () => import('./pages/home/home'), 					title: 'Home' }
		]
	}
];