import { Component, signal, input, output } from '@angular/core';

@Component({
  selector: 'app-aboutChild',
  templateUrl: './aboutChild.html',
  styleUrl: './aboutChild.css'
})

export class AboutChild {
	public readonly aboutChildText = signal('About Child');
  myInput = input.required<string>();  										 // Declare a required input signal
  myOutput = output<string>();  													 // Declare an output event emitter
  sendToParent(){
    this.myOutput.emit('Hello from the child component!'); // Emit the event to the parent using the .emit() method
  }
}