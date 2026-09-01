import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})

export default class Contact {
	protected title = signal('Contact us');
}