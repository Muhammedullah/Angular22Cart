import { Component, signal, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  styleUrl: './counter.css'
})

export class Counter {
	protected title = signal('Counter');
	private readonly initialValue = 0; 
	public counter = model(this.initialValue);
	protected reset(){
    this.counter.set(this.initialValue); // Reset back to default
  }
}