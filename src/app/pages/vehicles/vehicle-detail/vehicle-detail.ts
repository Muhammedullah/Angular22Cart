import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { CartService } from '@app/core/components/cart/cart.service';

@Component({
  selector: 'sw-vehicle-detail',
  imports: [DecimalPipe],
  templateUrl: './vehicle-detail.html',
	styleUrl: './vehicle-detail.css'
})

export class VehicleDetail {
  errorMessage = '';
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);

  // Signals used in the template
  vehicle = this.vehicleService.selectedVehicle;
  vehicleFilms = this.vehicleService.vehicleFilms;
  pageTitle = computed(() => this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : '');

  addToCart(vehicle: Vehicle | undefined){console.log('Nothing happens!');
//    if(vehicle) this.cartService.addToCart(vehicle);
  }
}