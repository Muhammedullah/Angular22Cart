import { Component } from '@angular/core';
import { VehicleList } from './vehicle-list/vehicle-list';
import { VehicleDetail } from './vehicle-detail/vehicle-detail';

@Component({
  selector: 'sw-vehicles',
  templateUrl: './vehicles.html',
  imports: [VehicleList, VehicleDetail]
})

export default class VehicleShell {}