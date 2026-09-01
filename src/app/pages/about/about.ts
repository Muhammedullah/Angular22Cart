import { Component, computed, signal } from '@angular/core';
import { AboutChild } from './aboutChild/aboutChild';
import { Counter } from './counter/counter';
import { Search } from './search/search';

@Component({
  selector: 'app-about',
	imports: [AboutChild, Counter, Search],
  templateUrl: './about.html',
  styleUrl: './about.css'
})

export default class About {
	protected counter = signal(0);
	protected selectedCategory = signal<string>('');
	public aboutText = signal('About Us');
  messageToSend = signal('Greeting from your parent!');		// A standard signal holding the data to send down
  childNotification = signal('No updates yet.');  				// A signal to capture and display data coming back up
  onChildAction(eventData: string){
    this.childNotification.set(eventData);    						// Update the local signal with the payload sent by the child
  }
}