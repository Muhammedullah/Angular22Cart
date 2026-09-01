import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  imports: [NgClass],
  templateUrl: './vehicle-list.html',
	styleUrl: './vehicle-list.css'
})

export class VehicleList {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  // Component signals
  vehicles = computed(() => {
    try {
      return this.vehicleService.vehicles();
    }
		catch (e){
      this.errorMessage = typeof e === 'string' ? e : 'Error';
      return [];
    }
  });
  selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }
}