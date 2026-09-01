import { Service, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Observable, map, switchMap, filter, forkJoin, shareReplay, EMPTY, catchError, throwError } from 'rxjs';
import { Film, Vehicle, VehicleResponse } from './vehicle';
import { environment } from '../../../environments/environment';

@Service()
export class VehicleService {
	private url = environment.url;
  http = inject(HttpClient);

  // First page of vehicles. If the price is empty, randomly assign a price (We can't modify the backend in this demo)
  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map(data => data.results.map(v => ({
				...v, cost_in_credits: isNaN(Number(v.cost_in_credits)) ? String(Math.random() * 100000) : v.cost_in_credits
      }) as Vehicle)
    ),
    shareReplay(1),
    catchError(this.handleError)
  );

  // Expose signals from this service
  vehicles = toSignal(this.vehicles$, {initialValue: [] as Vehicle[]});
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  private vehicleFilms$ = toObservable(this.selectedVehicle).pipe(
    filter(Boolean),
    switchMap(vehicle => forkJoin(vehicle.films.map(link => this.http.get<Film>(link))))
  );
  vehicleFilms = toSignal<Film[], Film[]>(this.vehicleFilms$, {initialValue: []});

  vehicleSelected(vehicleName: string){
    const foundVehicle = this.vehicles().find(v => v.name === vehicleName);
    this.selectedVehicle.set(foundVehicle);
  }
	
  private handleError(err: HttpErrorResponse): Observable<never> {
		let errorMessage = (err.error instanceof ErrorEvent) ?
		`An error occurred: ${err.error.message}` : `Server returned code: ${err.status}, error message is: ${err.message}`;
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}